'use client';
import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dot  = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  let ox = 0, oy = 0;

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (dot.current) {
        dot.current.style.left = e.clientX + 'px';
        dot.current.style.top  = e.clientY + 'px';
      }
    };

    let raf: number;
    let tx = 0, ty = 0;
    const loop = () => {
      ox += (tx - ox) * 0.1;
      oy += (ty - oy) * 0.1;
      if (ring.current) {
        ring.current.style.left = ox + 'px';
        ring.current.style.top  = oy + 'px';
      }
      raf = requestAnimationFrame(loop);
    };

    const onMoveRing = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY; };

    const onEnter = () => {
      dot.current?.classList.add('hovered');
      ring.current?.classList.add('hovered');
    };
    const onLeave = () => {
      dot.current?.classList.remove('hovered');
      ring.current?.classList.remove('hovered');
    };

    document.addEventListener('mousemove', onMove,     { passive: true });
    document.addEventListener('mousemove', onMoveRing, { passive: true });
    raf = requestAnimationFrame(loop);

    const interactives = document.querySelectorAll('a, button, [data-cursor]');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mousemove', onMoveRing);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dot} style={{
        position:'fixed', width:8, height:8,
        background:'var(--gold)', borderRadius:'50%',
        pointerEvents:'none', zIndex:9999,
        transform:'translate(-50%,-50%)',
        boxShadow:'0 0 12px var(--gold), 0 0 30px rgba(247,162,32,.4)',
        transition:'width .15s, height .15s',
      }} className="cursor-dot" />
      <div ref={ring} style={{
        position:'fixed', width:32, height:32,
        border:'1px solid rgba(247,162,32,.4)', borderRadius:'50%',
        pointerEvents:'none', zIndex:9998,
        transform:'translate(-50%,-50%)',
        transition:'width .3s, height .3s, border-color .3s',
      }} className="cursor-ring" />
      <style>{`
        .cursor-dot.hovered  { width:14px !important; height:14px !important; }
        .cursor-ring.hovered { width:52px !important; height:52px !important; border-color:rgba(247,162,32,.8) !important; }
        @media (max-width:768px) { .cursor-dot, .cursor-ring { display:none; } }
      `}</style>
    </>
  );
}
