import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"

export function AppTooltip ({Info}:{Info:string}) {
    return (
        <HoverCard>
        <HoverCardTrigger>
          <span className='font-serif bg-primary rounded-full text-white text-center inline-block px-[0.3rem] text-xs text-[0.5rem] leading-snug ml-1 cursor-pointer font-normal'>i</span>
        </HoverCardTrigger>
        <HoverCardContent>
          {Info}
        </HoverCardContent>
      </HoverCard>
      
    )
}