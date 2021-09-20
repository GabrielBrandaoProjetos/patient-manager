import { useEffect } from "react";


interface InfiniteScrollProps{
  fetchMore: () => void;
}

export const InfiniteScroll: React.FC<InfiniteScrollProps> = ({fetchMore}) => {

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
  }, [])
  return <div/>
}