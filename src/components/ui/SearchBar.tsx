
import React, { useState } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  onSearch?: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  placeholder = "Search destinations...", 
  className,
  onSearch
}) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className={cn(
        "relative w-full transition-all",
        "duration-300 ease-in-out",
        isFocused ? "scale-[1.01]" : "",
        className
      )}
    >
      <div className={cn(
        "relative flex items-center w-full",
        "glass-card rounded-full overflow-hidden",
        "transition-all duration-300",
        "group",
        isFocused 
          ? "shadow-lg" 
          : "shadow"
      )}>
        <Search className={cn(
          "absolute left-3 h-4 w-4",
          "text-muted-foreground",
          "transition-transform duration-300",
          isFocused ? "scale-110" : ""
        )} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            "flex h-10 w-full rounded-full",
            "bg-transparent px-9 py-2 text-sm",
            "ring-offset-background",
            "placeholder:text-muted-foreground",
            "focus:outline-none",
            "transition-all duration-300",
            "disabled:cursor-not-allowed disabled:opacity-50"
          )}
          placeholder={placeholder}
        />
        {query && (
          <button
            type="submit"
            className={cn(
              "absolute right-3 h-6 w-6",
              "flex items-center justify-center",
              "rounded-full bg-primary text-primary-foreground",
              "text-xs font-medium",
              "opacity-0 group-hover:opacity-100",
              "transition-all duration-300 ease-in-out"
            )}
          >
            Go
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
