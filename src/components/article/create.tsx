import * as z from "zod/v3";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { createArticle, getArticleById, updateArticle } from "./action";
import { ArticleFormValues } from "./type";
import { useRouter } from "next/navigation";
import { Combobox, ComboboxItem } from "./combobox";
import { toast } from "sonner";
import { ImagePlus } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(1, "العنوان مطلوب"),
  description: z.string().min(1, "الوصف مطلوب"),
  image: z.string().min(1, "الصورة مطلوبة"),
  body: z.string().min(1, "المحتوى مطلوب"),
  author: z.string().min(1, "الكاتب مطلوب"),
});

const authorItems: ComboboxItem[] = [
  { value: "المقداد الهجان", label: "المقداد الهجان" },
  { value: "هشام احمد", label: "هشام احمد" },
  { value: "ابو بكر جيكوني", label: "ابو بكر جيكوني" },
  { value: "قاسم الظافر", label: "قاسم الظافر" },
  { value: "الفاضل فرح", label: "الفاضل فرح" },
  { value: "يوسف مورو", label: "يوسف مورو" },
];

interface CreateArticleProps {
  onClose: () => void;
  onArticleCreated?: (newArticle: any) => void;
  onArticleUpdated?: (updatedArticle: any) => void;
  editArticleId?: string;
}

const CreateArticle: React.FC<CreateArticleProps> = ({
  onClose,
  onArticleCreated,
  onArticleUpdated,
  editArticleId,
}) => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(!!editArticleId);
  const isEditMode = !!editArticleId;

  const toggleStep = () => setStep(step === 1 ? 2 : 1);

  const form = useForm<ArticleFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
      body: "",
      author: "",
    },
    mode: "onChange",
  });

  const { formState } = form;
  const { isValid, errors } = formState;

  const isFirstStepValid =
    !errors.title && !errors.description && !errors.author && !errors.image;

  const isFormValid = isValid;

  const handleNextStep = () => {
    form
      .trigger(["title", "description", "author", "image"])
      .then((isValid) => {
        if (isValid) {
          setStep(2);
        } else {
          const errorMessages = [];
          if (errors.author) errorMessages.push("الكاتب");
          if (errors.title) errorMessages.push("العنوان");
          if (errors.description) errorMessages.push("الوصف");
          if (errors.image) errorMessages.push("الصورة");

          let message = "";
          if (errorMessages.length > 0) {
            message = `${errorMessages.join(" و ")} مطلوبين`;

            toast.error(message, {
              position: "bottom-right",
              duration: 3000,
            });
          }
        }
      });
  };

  // Load article data if in edit mode
  useEffect(() => {
    const loadArticle = async () => {
      if (editArticleId) {
        try {
          const article = await getArticleById(editArticleId);

          if (article) {
            form.reset({
              title: article.title,
              description: article.description,
              image: article.image,
              body: article.body,
              author: article.author,
            });
            setUploadedImage(article.image);
          }
        } catch (error) {
          console.error("Failed to load article for editing:", error);
          setError("Failed to load article data");
        } finally {
          setIsLoading(false);
        }
      }
    };

    if (editArticleId) {
      loadArticle();
    }
  }, [editArticleId, form]);

  const generateSlug = (title: string) => {
    const baseSlug = title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-")
      .trim();

    const timestamp = Date.now().toString().slice(-6);
    return `${baseSlug}-${timestamp}`;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setUploadedImage(previewUrl);
      form.setValue("image", previewUrl);
    }
  };

  const handleSubmit = async (data: ArticleFormValues) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const slug = generateSlug(data.title);

      let result;
      if (isEditMode && editArticleId) {
        result = await updateArticle(editArticleId, { ...data, slug });
      } else {
        result = await createArticle({ ...data, slug });
      }

      if (result.status === "error") {
        setError(result.message || "حدث خطأ غير معروف");
        setIsSubmitting(false);
        return;
      }

      form.reset();
      setUploadedImage(null);

      if (!isEditMode && onArticleCreated && result.data) {
        onArticleCreated(result.data);
      } else if (isEditMode && onArticleUpdated && result.data) {
        onArticleUpdated(result.data);
      }

      router.refresh();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ غير معروف");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormSubmit = async (data: ArticleFormValues) => {
    if (!isFormValid) {
      const errorMessages = [];
      if (errors.author) errorMessages.push("الكاتب");
      if (errors.title) errorMessages.push("العنوان");
      if (errors.description) errorMessages.push("الوصف");
      if (errors.image) errorMessages.push("الصورة");
      if (errors.body) errorMessages.push("المحتوى");

      let message = "";
      if (errorMessages.length > 0) {
        message = `${errorMessages.join(" و ")} مطلوبين`;

        toast.error(message, {
          position: "bottom-right",
          duration: 3000,
        });
      }
      return;
    }

    await handleSubmit(data);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading article data...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="transform -translate-y-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="w-[85%] px-6 md:px-0 min-w-[340px] md:min-w-[500px] lg:min-w-[600px] flex flex-col justify-center items-center gap-6 relative mx-auto"
          >
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                {error}
              </div>
            )}

            {step === 1 && (
              <div className="flex flex-col md:flex-row md:gap-8 w-full">
                {/* Left column: Title, Author and Description */}
                <div className="flex flex-col gap-5 w-full md:w-3/5">
                  <FormField
                    control={form.control}
                    name="author"
                    render={({ field }) => (
                      <FormItem className="w-[57.5%]">
                        <FormControl>
                          <Combobox
                            items={authorItems}
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="اختر الكاتب"
                            dir="rtl"
                          />
                        </FormControl>
                        <FormMessage className="hidden" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="w-full"
                            placeholder="العنوان"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="hidden" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            className="h-16 md:h-20 w-full"
                            placeholder="الوصف"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="hidden" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Right column: Image */}
                <div className="flex flex-col gap-6 w-full md:w-2/5 mt-6 md:mt-0">
                  <div className="w-full h-full">
                    <div className="border border-input rounded-md overflow-hidden bg-background relative h-full min-h-[150px]">
                      <input
                        type="file"
                        id="article-image-upload"
                        className="absolute opacity-0 inset-0 w-full h-full cursor-pointer z-10"
                        accept="image/*"
                        onChange={handleImageChange}
                      />

                      {!uploadedImage && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0">
                          <ImagePlus className="w-12 h-12 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-600 text-center">
                            اضغط او اسحب وافلت
                          </p>
                        </div>
                      )}

                      {uploadedImage && (
                        <div className="absolute inset-0 z-5 flex items-center justify-center bg-white">
                          <img
                            src={uploadedImage}
                            alt="صورة المقال"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>

                    <FormField
                      control={form.control}
                      name="image"
                      render={() => (
                        <FormItem>
                          <FormMessage className="hidden" />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col gap-6 w-full">
                <FormField
                  control={form.control}
                  name="body"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          className="h-60 w-full"
                          placeholder="المحتوى"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="hidden" />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Navigation and submit buttons */}
            <div className="flex justify-between w-full mt-4">
              {step === 1 ? (
                <div className="flex gap-3">
                  <Button
                    type="submit"
                    className="h-9 font-medium"
                    disabled={isSubmitting || !isFormValid}
                  >
                    {isSubmitting
                      ? isEditMode
                        ? "...جاري التحديث"
                        : "...جاري الإنشاء"
                      : isEditMode
                        ? "تحديث المقال"
                        : "إنشاء مقال"}
                  </Button>
                  <Button
                    type="button"
                    onClick={handleNextStep}
                    className="h-9 font-medium"
                    variant="outline"
                  >
                    التالي
                  </Button>
                </div>
              ) : (
                <div className="flex gap-3">
                  <Button
                    type="submit"
                    className="h-9 font-medium"
                    disabled={isSubmitting || !isFormValid}
                  >
                    {isSubmitting
                      ? isEditMode
                        ? "...جاري التحديث"
                        : "...جاري الإنشاء"
                      : isEditMode
                        ? "تحديث المقال"
                        : "إنشاء مقال"}
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setStep(1)}
                    className="h-9 font-medium"
                    variant="outline"
                  >
                    السابق
                  </Button>
                </div>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateArticle;
