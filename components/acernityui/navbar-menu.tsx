"use client";
import React from "react";
import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";


const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
  href,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
  href?: string;
}) => {
  const router = useRouter();
  const hasChildren = Boolean(children);

  const handleClick = () => {
    if (href) router.push(href); // ✅ Always navigate if href exists
  };

  return (
    <div
      onMouseEnter={() => hasChildren && setActive(item)}
      onClick={handleClick}
      className="relative cursor-pointer"
    >
      <motion.p
        transition={{ duration: 0.3 }}
        className="hover:opacity-[0.9] text-white"
      >
        {item}
      </motion.p>

      {hasChildren && active === item && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4">
            <motion.div
              transition={transition}
              layoutId="active"
              className="bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-white/[0.2] shadow-xl"
            >
              <motion.div layout className="w-max h-full p-4">
                {children}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)} // resets the state
      className="relative rounded-full border  backdrop-blur-[17px] backdrop-saturate-[154%] bg-[rgba(10,16,26,0.86)]   border-[rgba(255,255,255,0.125)] bg-black dark:border-white/[0.2]  shadow-input flex justify-center h-16 space-x-4 px-8 py-4 "
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) => {
  return (
    <Link href={href} className="flex space-x-2">
      <Image
        src={src}
        width={140}
        height={70}
        alt={title}
        className="shrink-0 rounded-md shadow-2xl"
      />
      <div>
        <h4 className="text-xl font-bold mb-1 text-white">
          {title}
        </h4>
        <p className=" text-sm max-w-[10rem] text-neutral-500">
          {description}
        </p>
      </div>
    </Link>
  );
};

export const HoveredLink = ({ children, ...rest }: any) => {
  return (
    <Link
      {...rest}
      className="text-neutral-400 hover:text-white "
    >
      {children}
    </Link>
  );
};
