'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { motion, AnimatePresence } from 'framer-motion'

interface Heading {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  content: string
  children?: React.ReactNode
}

export function TableOfContents({ content, children }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const [isCollapsed, setIsCollapsed] = useState(false)

  // Extract headings from markdown content
  useEffect(() => {
    const extractHeadings = () => {
      const headingRegex = /^(#{1,6})\s+(.+)$/gm
      const matches = [...content.matchAll(headingRegex)]
      
      return matches.map((match, index) => {
        const level = match[1].length
        const text = match[2]
        // Create an id from the heading text
        const id = text
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
        
        return { id, text, level }
      })
    }

    setHeadings(extractHeadings())
  }, [content])

  // Set up intersection observer for headings
  useEffect(() => {
    if (headings.length === 0) return

    const observers = new Map()
    
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id)
        }
      })
    }

    const observerOptions = {
      rootMargin: '-80px 0px -80% 0px',
      threshold: 0
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    
    // Observe all heading elements
    headings.forEach(heading => {
      const element = document.getElementById(heading.id)
      if (element) {
        observer.observe(element)
        observers.set(heading.id, observer)
      }
    })

    return () => {
      // Cleanup observers when component unmounts
      observers.forEach(observer => observer.disconnect())
    }
  }, [headings])

  if (headings.length === 0) {
    return null
  }

  const shouldBeScrollable = headings.length > 4

  return (
    <div className=" bg-card rounded-md ">
      <div className="flex items-center bg-[#7D1C21] text-white justify-between mb-4">
       
        {shouldBeScrollable && (
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1  rounded-md transition-colors"
            aria-label={isCollapsed ? "Expand table of contents" : "Collapse table of contents"}
          >
            {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        )}
      </div>
      <AnimatePresence>
        {(!shouldBeScrollable || !isCollapsed) && (
          <motion.div
           
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ScrollArea className={cn(
              "transition-all duration-200",
              shouldBeScrollable && "h-[300px]"
            )}>
              <nav className="space-y-1 pr-4">
                {headings.map((heading) => (
                  <Link
                    key={heading.id}
                    href={`#${heading.id}`}
                    className={cn(
                      "block text-xs py-1 transition-colors border-l-2 pl-3",
                      heading.level === 2 ? "pl-3" : "pl-5",
                      heading.level > 3 ? "hidden" : "",
                      activeId === heading.id
                        ? "text-[#7D1C21] border-accent font-medium"
                        : "border-transparent hover:text-[#7D1C21] hover:border-[#7D1C21]/30"
                    )}
                    onClick={(e) => {
                      e.preventDefault()
                      document.getElementById(heading.id)?.scrollIntoView({
                        behavior: 'smooth'
                      })
                    }}
                  >
                    {heading.text}
                  </Link>
                ))}
              </nav>
            </ScrollArea>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </div>
  )
} 