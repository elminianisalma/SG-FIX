import ProjectCard from "./projectCard";
import TimelineHeader from './timelineHeader';


export default function Page() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-6">

      <div className="space-y-4">
        <ProjectCard
          name="Ryan Howard - Bathroom Remodel"
          completedTasks={6}
          totalTasks={30}
          dueDate="May 4, 2023"
          paid="$13.37k"
          due="$20.05k"
          laborCost="$6,400.00"
          materialCost="$6,400.00"
          overdue
        />

        <ProjectCard
          name="Nijum Chy - Bathroom Remodel"
          completedTasks={6}
          totalTasks={30}
          dueDate="May 4, 2023"
          paid="$0.00"
          due="$0.00"
          laborCost="$0.00"
          materialCost="$0.00"
        />
      </div>
    </main>
  );
}
