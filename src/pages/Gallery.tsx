
import React, { useState } from "react";
import { Search, Filter, Plus } from "lucide-react";
import AnimatedPage from "@/components/layout/AnimatedPage";
import MemoryCard from "@/components/ui/MemoryCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Memory {
  id: string;
  image: string;
  date: Date;
  location: string;
  note?: string;
}

const memories: Memory[] = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29",
    date: new Date(2023, 5, 15),
    location: "Golden Gate Bridge, San Francisco",
    note: "The view from the bridge was absolutely breathtaking!"
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f",
    date: new Date(2023, 4, 20),
    location: "Eiffel Tower, Paris",
    note: "Finally made it to the top! The city looks magical from up here."
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff",
    date: new Date(2023, 7, 3),
    location: "Santorini, Greece",
    note: "The white buildings against the blue sea - just like in the pictures!"
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1624253321171-1be53e12f5f4",
    date: new Date(2023, 3, 12),
    location: "Kyoto Temples, Japan",
    note: "The peaceful atmosphere and beautiful architecture were incredible."
  },
  {
    id: "5",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8",
    date: new Date(2023, 1, 25),
    location: "Maldives Beach",
    note: "Crystal clear water and white sand beaches - paradise found!"
  },
  {
    id: "6",
    image: "https://images.unsplash.com/photo-1531410050281-59e31dd04ab3",
    date: new Date(2023, 2, 8),
    location: "Swiss Alps",
    note: "The mountains were covered in snow, creating a magical winter wonderland."
  }
];

const Gallery: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredMemories = memories.filter(memory => 
    memory.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (memory.note && memory.note.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <AnimatedPage>
      <div className="page-container pb-20 sm:pb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Gallery & Memories</h1>
          
          <Button 
            variant="default"
            size="sm"
            className="gap-1"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Memory</span>
          </Button>
        </div>
        
        {/* Search and Filter */}
        <div className="flex gap-2 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search memories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 glass-card bg-transparent"
            />
          </div>
          
          <Button variant="outline" size="icon" className="glass-card">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Memories Grid */}
        {filteredMemories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMemories.map((memory, index) => (
              <MemoryCard
                key={memory.id}
                image={memory.image}
                date={memory.date}
                location={memory.location}
                note={memory.note}
                className="animation-delay-[calc(100ms*var(--index))]"
                style={{ '--index': index } as React.CSSProperties}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No memories found. Try a different search or add new memories.</p>
          </div>
        )}
      </div>
    </AnimatedPage>
  );
};

export default Gallery;
