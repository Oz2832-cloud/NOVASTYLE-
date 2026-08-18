import { useEffect, useState } from "react";

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  fallback: string;
};

/** Imagen con respaldo: evita tarjetas en blanco si la foto externa falla. */
export function SafeImage({ src, fallback, className = "", alt = "", ...rest }: Props) {
  const [current, setCurrent] = useState(src);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setCurrent(src);
    setFailed(false);
  }, [src]);

  return (
    <div className="relative h-full w-full bg-gradient-soft">
      <img
        {...rest}
        src={current}
        alt={alt}
        className={className}
        onError={() => {
          if (current !== fallback) setCurrent(fallback);
          else setFailed(true);
        }}
      />
      {failed && (
        <span className="absolute inset-0 grid place-items-center bg-gradient-soft text-[10px] font-bold uppercase tracking-widest text-nova-purple">
          NOVASTYLE
        </span>
      )}
    </div>
  );
}
