import cn from 'clsx'
import { HTMLAttributes, ReactNode } from 'react'
import style from './Skeleton.module.css'

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  show?: boolean
}

export default function Skeleton(props: SkeletonProps) {
  const { className, show, children, ...rest } = props
  if (show || children == null) {
    return <div className={cn(style.skeleton, className)} {...rest} />
  }

  return <>{children}</>
}
