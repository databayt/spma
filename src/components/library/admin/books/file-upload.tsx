"use client"

import { useState } from "react"
import Image from "next/image"
import { Film, Image as ImageIcon, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Props {
  value: string
  onChange: (url: string) => void
  accept?: "image" | "video"
  placeholder?: string
}

export default function FileUpload({
  value,
  onChange,
  accept = "image",
  placeholder,
}: Props) {
  const [showInput, setShowInput] = useState(!value)
  const [inputValue, setInputValue] = useState(value)

  const handleSubmitUrl = () => {
    if (inputValue.trim()) {
      onChange(inputValue.trim())
      setShowInput(false)
    }
  }

  const handleRemove = () => {
    onChange("")
    setInputValue("")
    setShowInput(true)
  }

  // Show preview when URL is set
  if (value && !showInput) {
    return (
      <div className="space-y-4">
        <div className="relative overflow-hidden rounded-lg border">
          {accept === "image" && (
            <div className="bg-muted relative aspect-[3/4] w-full max-w-[200px]">
              <Image
                src={value}
                alt="Book cover"
                fill
                className="object-cover"
                onError={() => {
                  // Keep showing even on error - the URL might work at runtime
                }}
              />
            </div>
          )}
          {accept === "video" && (
            <div className="flex items-center gap-3 p-4">
              <div className="bg-primary/10 rounded-full p-2">
                <Film className="text-primary h-6 w-6" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">Video URL set</p>
                <p className="text-muted-foreground truncate text-xs">
                  {value}
                </p>
              </div>
            </div>
          )}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleRemove}
            className="bg-background/80 absolute end-2 top-2 backdrop-blur-sm"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    )
  }

  // URL input
  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
            {accept === "image" ? (
              <ImageIcon className="text-muted-foreground h-4 w-4" />
            ) : (
              <Film className="text-muted-foreground h-4 w-4" />
            )}
          </div>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={placeholder || `Enter ${accept} URL`}
            className="ps-10"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                handleSubmitUrl()
              }
            }}
          />
        </div>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={handleSubmitUrl}
          disabled={!inputValue.trim()}
        >
          Set
        </Button>
      </div>
      <p className="text-muted-foreground text-xs">
        Paste a direct URL to the {accept} file
      </p>
    </div>
  )
}
