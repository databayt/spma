"use client";

import React from "react";
import SiteHeading from "@/components/atom/site-heading";
import { getAllArticles, deleteArticle } from "@/components/article/action";
import { articles as staticArticles } from "@/components/template/article/constant";
import ArticleHoverEffect from "@/components/atom/card-article";
import { CreateArticleButton } from "@/components/article/dialog";
import { Article, ArabicMonths } from "@/components/article/type";
import { useRouter } from "next/navigation";
import { useModal } from "@/components/atom/modal/context";
import Modal from "@/components/atom/modal/modal";
import CreateArticle from "@/components/article/create";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ARABIC_MONTH_NAMES } from "@/components/article/constant";
import Loading from "@/components/atom/loading";
import { useTranslations } from "@/lib/use-translations";

export default function AllArticlesPage() {
  const router = useRouter();
  const { t, locale } = useTranslations();
  const a = t.article;
  const { modal, openModal, closeModal } = useModal();
  const [articles, setArticles] = React.useState<Article[]>([]);
  const [editingArticleId, setEditingArticleId] = React.useState<string | null>(
    null,
  );
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      try {
        const dbArticles = await getAllArticles();

        const articlesData =
          dbArticles.length > 0
            ? dbArticles
            : staticArticles.map((article, index) => ({
                id: `static-${index + 1}`,
                title: article.title,
                slug: `article-${index + 1}`,
                description: article.description,
                image: article.image,
                body: "This is the full article content that will be displayed on the article page.",
                author: article.author,
                createdAt: new Date(),
                updatedAt: new Date(),
              }));

        setArticles(articlesData);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const formattedArticles = articles.map((article: Article) => {
    const date = new Date(article.createdAt);
    const year = date.getFullYear();
    const day = date.getDate();

    const month = ARABIC_MONTH_NAMES[date.getMonth() as keyof ArabicMonths];
    const formattedDate = `${day} ${month} ${year}`;

    return {
      id: article.id,
      title: article.title,
      description: article.description,
      link: `/${locale}/article/${article.slug}`,
      image: article.image,
      date: formattedDate,
      author: article.author,
    };
  });

  const handleEdit = (id: string) => {
    setEditingArticleId(id);
    openModal(null);
  };

  const handleDelete = async (id: string) => {
    toast(a?.deletePrompt ?? "هل تريد حذف هذا المقال؟", {
      action: {
        label: t.common.delete,
        onClick: async () => {
          try {
            await deleteArticle(id);
            setArticles(articles.filter((article) => article.id !== id));
            toast.success(a?.deleteSuccess ?? "تم حذف المقال بنجاح", {
              position: "bottom-right",
              style: { backgroundColor: "rgb(239, 68, 68)", color: "white" },
            });
          } catch (error) {
            console.error("Error deleting article:", error);
            toast.error(a?.deleteError ?? "حدث خطأ أثناء حذف المقال", {
              position: "bottom-right",
            });
          }
        },
      },
      cancel: {
        label: t.common.cancel,
        onClick: () => {},
      },
      duration: 10000,
      position: "bottom-right",
      style: {
        backgroundColor: "rgb(239, 68, 68)",
        color: "white",
        width: "280px",
        maxWidth: "280px",
      },
      classNames: {
        actionButton: "!bg-white !text-red-500 font-bold hover:!bg-gray-100",
        cancelButton:
          "bg-transparent text-white border border-white hover:bg-red-600",
      },
    });
  };

  const handleShare = (item: any) => {
    if (navigator.share) {
      navigator
        .share({
          title: item.title,
          text: item.description,
          url: window.location.origin + item.link,
        })
        .catch((error) => console.log("Error sharing", error));
    } else {
      navigator.clipboard.writeText(window.location.origin + item.link);
      toast.success(a?.linkCopied ?? "تم نسخ الرابط إلى الحافظة", {
        position: "bottom-right",
      });
    }
  };

  const editingArticle = editingArticleId
    ? articles.find((article) => article.id === editingArticleId)
    : null;

  const handleArticleCreated = (newArticle: Article) => {
    setArticles((prevArticles) => [newArticle, ...prevArticles]);
  };

  const handleArticleUpdated = (updatedArticle: Article) => {
    setArticles((prevArticles) =>
      prevArticles.map((article) =>
        article.id === updatedArticle.id ? updatedArticle : article,
      ),
    );
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="">
      <div className="pe-2">
        <SiteHeading title={a?.title ?? "المقالات"} description="" align="start" />
      </div>
      <div className="max-w-5xl mx-auto -mt-14">
        <div className="flex justify-between items-center md:mt-6 mt-10">
          <Button
            variant="outline"
            onClick={() => {
              setEditingArticleId(null);
              openModal(null);
            }}
          >
            {a?.addArticle ?? "إضافة مقال"}
          </Button>
        </div>

        <ArticleHoverEffect
          items={formattedArticles}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onShare={handleShare}
        />

        {formattedArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              {a?.noArticles ?? "No articles found. Create your first article by clicking the button above."}
            </p>
          </div>
        )}
      </div>

      {modal.open && (
        <Modal
          content={
            editingArticleId ? (
              <CreateArticle
                onClose={() => {
                  closeModal();
                  setEditingArticleId(null);
                }}
                editArticleId={editingArticleId}
                onArticleUpdated={handleArticleUpdated}
              />
            ) : (
              <CreateArticle
                onClose={() => {
                  closeModal();
                  setEditingArticleId(null);
                }}
                onArticleCreated={handleArticleCreated}
              />
            )
          }
        />
      )}
    </div>
  );
}
