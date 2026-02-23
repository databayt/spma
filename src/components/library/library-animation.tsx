"use client"

import { useEffect, useState } from "react"
import Lottie from "lottie-react"

interface LibraryAnimationProps {
  className?: string
}

export function LibraryAnimation({ className }: LibraryAnimationProps) {
  const [animationData, setAnimationData] = useState<object | null>(null)

  useEffect(() => {
    fetch(
      "https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/6931c5426a3fbb9a2be31b1e_Claude_for_Excel.json"
    )
      .then((res) => res.text())
      .then((text) => {
        // Replace orange (#D97757) with brand yellow (#EAB308)
        const replaced = text.replace(
          /0\.850980392157,0\.466666666667,0\.341176470588/g,
          "0.917647058824,0.701960784314,0.031372549020"
        )
        setAnimationData(JSON.parse(replaced))
      })
      .catch(console.error)
  }, [])

  if (!animationData) {
    return (
      <div className={`${className} flex items-center justify-center`}>
        <div className="border-primary/20 border-t-primary h-16 w-16 animate-spin rounded-full border-4" />
      </div>
    )
  }

  return (
    <div className={className}>
      <Lottie
        animationData={animationData}
        loop={true}
        autoplay={true}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  )
}
