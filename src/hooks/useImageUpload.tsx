import { useCallback, useEffect, useRef, useState } from 'react'

import { useImageMap } from '@/app/(private)/dashboard/posts/_module/create-post/providers/ImageUploadContext'

interface UseImageUploadProps {
  onUpload?: (url: string) => void
}

export const useImageUpload = ({ onUpload }: UseImageUploadProps = {}) => {
  const previewRef = useRef<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageMapRef = useImageMap()
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const dummyUpload = async (file: File, localUrl: string): Promise<string> => {
    try {
      setUploading(true)
      setError(null)
      return localUrl
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed'
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setUploading(false)
    }
  }

  const handleThumbnailClick = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const handleFileChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (file) {
        setFileName(file.name)
        const localUrl = URL.createObjectURL(file)
        setPreviewUrl(localUrl)
        previewRef.current = localUrl

        imageMapRef.current.set(localUrl, file)
        try {
          const uploadedUrl = await dummyUpload(file, localUrl)
          onUpload?.(uploadedUrl)
        } catch (err) {
          URL.revokeObjectURL(localUrl)
          setPreviewUrl(null)
          setFileName(null)
          return console.error(err)
        }
      }
    },
    [onUpload],
  )

  const handleRemove = useCallback(() => {
    const currentUrl = previewRef.current
    if (currentUrl) {
      URL.revokeObjectURL(currentUrl)
      imageMapRef.current.delete(currentUrl)
    }
    setPreviewUrl(null)
    setFileName(null)
    previewRef.current = null
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    setError(null)
  }, [previewUrl, imageMapRef])

  useEffect(() => {
    return () => {
      if (previewRef.current) {
        URL.revokeObjectURL(previewRef.current)
      }
    }
  }, [])

  return {
    previewUrl,
    fileName,
    fileInputRef,
    handleThumbnailClick,
    handleFileChange,
    handleRemove,
    uploading,
    error,
  }
}
