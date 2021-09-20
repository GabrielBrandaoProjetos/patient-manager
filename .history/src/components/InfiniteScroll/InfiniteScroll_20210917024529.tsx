import { useEffect, useRef } from "react";


interface InfiniteScrollProps{
  fetchMore: () => void;
}

export const InfiniteScroll: React.FC<InfiniteScrollProps> = ({fetchMore}) => {
  const divRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const options = {
      root: document.querySelector('#table'),
      rootMargin: '0px',
      threshold: 1.0
    }
    
    const observer = new IntersectionObserver(([entry]) => {
      if(entry.isIntersecting){
        observer.disconnect()
        fetchMore()
      }
    }, options);
    divRef.current && observer.observe(divRef.current)

  }, [])
  return <div ref={divRef}/>
}