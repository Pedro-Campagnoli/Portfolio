import { ReactNode } from "react";

interface DevCardProps {
  label?: string;     
  children: ReactNode; 
}
export default function DevCard({ 
  label = 'developer.ts', 
  children 
}: DevCardProps){
  return(
        <div className="flex w-full max-w-md flex-col overflow-hidden rounded-2xl border border-border bg-surface font-mono text-sm text-gray-200 shadow-sm">
          <div className="flex items-center gap-2 border-b border-border w-full bg-card-header-background px-4 py-3">
            <span className="h-1.5 w-1.5 md:h-3 md:w-3 rounded-full bg-danger" />
            <span className="h-1.5 w-1.5 md:h-3 md:w-3 rounded-full bg-warning" />
            <span className="h-1.5 w-1.5 md:h-3 md:w-3 rounded-full bg-success" />
            <span className="ml-2 select-none text-[10px] md:text-sm text-primary-text ">
              {label}
            </span>
          </div>

          <div className="flex justify-center px-6 py-6">
            {children}
          </div>
        </div>

  )
}