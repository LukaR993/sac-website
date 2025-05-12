'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CookingPot, RefreshCcw as ReloadIcon, Search, StopCircleIcon as StopIcon } from 'lucide-react'
import { ArrowRight, ArrowUp, ChevronDown, Copy, File, Paperclip } from 'lucide-react'
import { useChat } from '@ai-sdk/react'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { MemoizedMarkdown } from './markdown-block'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import Link from "next/link"
import { Locale } from '@/types'


type list_of_resources = {
  content: string;
  score: number;
  source: string;
  title: string;
}[];

type knowledgeBaseResult = {
  list_of_resources: list_of_resources;
  most_relevant_article: string;
}

export default function StarkoAssistant(params: {id: string, initialMessage: string, className?: string, locale: Locale}) {

  const [open, setOpen] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  
  const { messages, input, handleInputChange, handleSubmit, append, status, stop, reload, error } = useChat({
    api: "https://v2.starko.one/api/ai/general",
    headers: {
      "x-starko-workspace-id": params.id,
    },
    maxSteps: 4,
  });

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const latestMessageRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);



  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      const container = messagesContainerRef.current;
      container.scrollTop = container.scrollHeight;
      
      // Smooth scroll
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
      
      // Force scroll after delay
      setTimeout(() => {
        if (container) {
          container.scrollTop = container.scrollHeight + 1000;
          requestAnimationFrame(() => {
            container.scrollTop = container.scrollHeight + 1000;
          });
        }
      }, 100);
    }
  };

  // Scroll on new messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Scroll on content changes
  useEffect(() => {
    if (latestMessageRef.current && messagesContainerRef.current) {
      const observer = new MutationObserver(() => {
        scrollToBottom();
      });

      observer.observe(latestMessageRef.current, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true,
      });

      return () => observer.disconnect();
    }
  }, [messages]);

  // Handle scroll button visibility
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
      setShowScrollButton(distanceFromBottom > 100);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (inputRef.current && open) {
      inputRef.current.focus();
    }
  }, [open, status]);

  return (
    <div className={cn('mx-auto w-full mt-8 mb-12 px-4 md:px-0  min-w-[300px] ', params.className)}>
      <div className='relative flex items-center'>
       <Search className='w-4 h-4 absolute left-2' />
        <Input 
          placeholder="Search" 
          className='w-full px-9  bg-white'
          value={input}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setOpen(true);
              if (input.trim().length === 0) {
                toast.error("Please enter a question");
                return;
              }
              handleSubmit(e);
            }
          }}
        />
        <Button 
          size={'sm'} 
          variant={'ghost'} 
          className='absolute hover:bg-background focus-visible:text-primary rounded right-[2px]'
          onClick={() => {
            if (input.trim().length === 0) {
              toast.error("Please enter a question");
              return;
            }
            setOpen(true);
          }}
        >
          <ArrowRight className='w-2 h-2 -rotate-90' />
        </Button>
      </div>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='bg-white flex flex-col  overflow-y-auto justify-between items-center backdrop-blur border-primary/[0.05] p-0 min-h-[80vh] md:min-h-[60vh] max-w-[90vw] rounded-md  md:max-w-3xl w-full max-h-[60vh]'>
          <DialogHeader className='sr-only'>
            <DialogTitle>Starko Assistant</DialogTitle>
            <DialogDescription>
              Ask Starko anything about the app.
            </DialogDescription>
          </DialogHeader>
          
          <div 
            className='p-4 flex-1 w-full min-h-[40vh]  overflow-y-auto overflow-x-hidden relative'
            ref={messagesContainerRef}
            // style={{ minHeight:  }}
          >
            <div className="flex relative flex-col gap-4 w-full mx-auto md:px-2 py-3">
              {messages.map((message, index) => {
                const isLatestMessage = index === messages.length - 1;
                return (
                  <div
                    key={index + message.id}
                    ref={isLatestMessage ? latestMessageRef : null}
                    className={`flex flex-col p-1.5 rounded-md w-fit scroll-mt-16 ${message.role === "user" ? "self-end border bg-background w-fit" : "items-start w-fit self-start"}`}
                  >
                    <p className={`text-xs text-muted-foreground ${message.role === "user" ? "" : "my-2"}`}>
                      {message.role === "user" ? null : (
                        <span className="flex items-center gap-2">
                         <CookingPot className='w-4 h-4' />
                          <span className="text-xs text-muted-foreground">
                           Sač AI
                            {status === "streaming" && isLatestMessage && ' Thinking...'}
                          </span>
                        </span>
                      )}
                    </p>
                    
                    {message.parts.map((part, partIndex) => {
                      if (part.type === "tool-invocation" && part.toolInvocation.toolName === "checkResources") {
                        if (part.toolInvocation.state !== "result") {
                          return (
                            <span key={`${message.id}-${partIndex}-skeleton`} className="w-full pl-6 min-w-48 md:min-w-[700px] flex flex-col gap-2">
                              <div className="bg-accent/80 w-2/3 h-3 animate-pulse rounded"></div>
                              <div className="bg-accent/80 w-1/3 h-3 animate-pulse rounded"></div>
                              <div className="bg-accent/80 w-1/2 h-3 animate-pulse rounded"></div>
                              <div className="bg-accent/80 w-2/3 h-3 animate-pulse rounded"></div>
                            </span>
                          );
                        }
                      }
                      return null;
                    })}
                    
                    <div className={`${message.role !== "user" ? "pl-6" : "pl-0"} w-full`}>
                      <MemoizedMarkdown content={message.content} id={message.id} />
                    </div>
                    
                    {message.experimental_attachments &&
                      message.experimental_attachments.filter((attachment) => attachment.contentType?.startsWith("image/")).length > 0 && (
                        <div className="flex items-center gap-2 mt-2">
                          <Paperclip className="h-4 w-4" />
                          {message.experimental_attachments
                            .filter((attachment) => attachment.contentType?.startsWith("image/"))
                            .map((attachment, attIndex) => (
                              <div key={`${message.id}-${attIndex}`} className="inline-flex items-center border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md px-2.5 py-0.5 text-xs">
                                {attachment.name}
                              </div>
                            ))}
                        </div>
                      )}
                    
                    {message.parts.map((part, partIndex) => {
                      if (
                        part.type === "tool-invocation" &&
                        part.toolInvocation.state === "result" &&
                        part.toolInvocation.toolName === "checkResources" &&
                        (!isLatestMessage || status === "ready") &&
                        part.toolInvocation.result && 
                        typeof part.toolInvocation.result === "object"
                      ) {
                        const result = part.toolInvocation.result as knowledgeBaseResult;
                        if (Array.isArray(result.list_of_resources)) {
                          return (
                            <div key={`${message.id}-${partIndex}-resources`} className="flex pl-6 mt-4 flex-wrap items-center gap-2">
                              <span className="text-xs text-muted-foreground">Sources:</span>
                              
                              {result.list_of_resources?.sort((a, b) => Number(b.score) - Number(a.score)).map((item, resourceIndex) => {
                                const isFirst = result.list_of_resources.findIndex((t) => t.source === item.source) === resourceIndex;
                                if (isFirst) {
                                  return (
                                    <Link
                                      key={`${item.source}-${resourceIndex}`}
                                      href={`/${params.locale}/products/${item.source}`}
                                      className="inline-flex items-center border border-input bg-background hover:bg-accent hover:text-primary rounded-md px-2.5 py-0.5 text-xs"
                                    >
                                      <File className="h-4 w-4 mr-1" />
                                      <span className="text-xs ">{item?.title}</span>
                                    </Link>
                                  );
                                }
                                return null;
                              })}
                            </div>
                          );
                        }
                      }
                      return null;
                    })}
                    
                    {(message.role === "assistant" && (!isLatestMessage)) && (
                      <div className="flex w-full justify-start pl-6 mt-2 items-center gap-2">
                        <Button
                          onClick={() => {
                            navigator.clipboard.writeText(message.content);
                            toast.success("Copied to clipboard");
                          }}
                          variant={"outline"}
                          size={"icon"}
                          className="p-1 h-fit w-fit"
                        >
                          <Copy className="h-4 w-4" /> <span className="text-xs text-muted-foreground">Copy response</span>
                        </Button>
                      </div>
                    )}
                  </div>
                );
              })}
              
              {status === "error" && (
                <div className="flex w-full flex-col justify-end mt-2 gap-2">
                  <span className="text-sm text-red-400">Error loading response please try again, we are sorry for the inconvenience.</span>
                  <span className="text-xs">
                    Details: {error?.message}
                  </span>
                  <Button
                    onClick={() => {
                      reload();
                    }}
                    variant={"outline"}
                    size={"icon"}
                    className="p-1 h-fit w-fit"
                  >
                    <ReloadIcon className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          {showScrollButton && (
            <div className="absolute bottom-24 left-0 right-0 w-full flex justify-center z-10 items-center">
              <Button
                onClick={scrollToBottom}
                className="bg-background/80 backdrop-blur-sm shadow-lg hover:bg-background/90"
                size="sm"
                variant="outline"
              >
                <ChevronDown className="h-4 w-4 mr-2" />
                Scroll to bottom
              </Button>
            </div>
          )}
          
          <form 
            ref={formRef} 
            onSubmit={(e) => {
              e.preventDefault();
              if (status === "streaming") return;

              if (input.trim().length === 0) {
                toast.error("Please enter a question");
                return;
              }

              handleSubmit(e);
              scrollToBottom();
            }}
            className="flex items-center justify-center md:px-12 w-full"
          >
            <input
              ref={inputRef}
              type='text'
              placeholder='Type your message here...'
              className='border-b-0 border-primary/5 focus-visible:ring-0 border text-sm shadow-xl w-full bg-primary/5 p-4 backdrop-blur bg-gradient-to-t from-accent/5 via-white to-background rounded-t-md resize-none'
              value={input}
              onChange={handleInputChange}
              disabled={status === "streaming" || status !== "ready"}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  if (input.trim().length === 0) {
                    toast.error("Please enter a question");
                    return;
                  }
                  formRef.current?.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
                }
              }}
            />
            {status !== "streaming" ? (
              <Button 
                type='submit' 
                size={'sm'} 
                variant={'ghost'} 
                disabled={status !== "ready"}
                className='absolute border-primary/10 h-8 w-8 border rounded-full focus-visible:text-primary hover:bg-background bottom-2 right-4 md:right-14'
              >
                <ArrowUp className='w-2 h-2' />
              </Button>
            ) : (
              <Button 
                onClick={() => stop()} 
                size={'sm'} 
                variant={'ghost'} 
                className='absolute border-primary/10 h-8 w-8 border rounded-full focus-visible:text-primary hover:bg-background bottom-2 right-12'
              >
                <StopIcon className='w-2 h-2 text-muted-foreground' />
              </Button>
            )}
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
