import React from 'react'

interface MarkdownDisplayProps {
  content: string
  className?: string
}

export function MarkdownDisplay({ content, className = '' }: MarkdownDisplayProps) {
  const renderMarkdown = (text: string) => {
    // Split by lines to process each line
    const lines = text.split('\n')
    const elements: React.ReactElement[] = []
    let currentIndex = 0

    lines.forEach((line, index) => {
      const key = `line-${index}`
      
      // Empty lines
      if (line.trim() === '') {
        elements.push(<div key={key} className="h-2" />)
        return
      }

      // Bold text with **
      let processedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      
      // Headers (### ## #)
      if (line.startsWith('### ')) {
        elements.push(
          <h3 key={key} className="text-lg font-semibold text-gray-200 mt-4 mb-2">
            <span dangerouslySetInnerHTML={{ __html: processedLine.replace('### ', '') }} />
          </h3>
        )
        return
      }
      
      if (line.startsWith('## ')) {
        elements.push(
          <h2 key={key} className="text-xl font-semibold text-gray-200 mt-4 mb-2">
            <span dangerouslySetInnerHTML={{ __html: processedLine.replace('## ', '') }} />
          </h2>
        )
        return
      }
      
      if (line.startsWith('# ')) {
        elements.push(
          <h1 key={key} className="text-2xl font-bold text-gray-100 mt-4 mb-3">
            <span dangerouslySetInnerHTML={{ __html: processedLine.replace('# ', '') }} />
          </h1>
        )
        return
      }

      // List items
      if (line.startsWith('• ')) {
        elements.push(
          <div key={key} className="flex items-start gap-2 mb-1 ml-4">
            <span className="text-gray-400 mt-0.5">•</span>
            <span 
              className="text-gray-300 leading-relaxed" 
              dangerouslySetInnerHTML={{ __html: processedLine.replace('• ', '') }} 
            />
          </div>
        )
        return
      }

      // Regular paragraphs
      elements.push(
        <p key={key} className="text-gray-300 leading-relaxed mb-2">
          <span dangerouslySetInnerHTML={{ __html: processedLine }} />
        </p>
      )
    })

    return elements
  }

  return (
    <div className={`markdown-content ${className}`}>
      {renderMarkdown(content)}
    </div>
  )
} 