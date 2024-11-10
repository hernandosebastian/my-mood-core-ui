import { Separator } from "@radix-ui/react-separator";
import { SidebarTrigger } from "../ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "../ui/breadcrumb";

const tips = [
  "Take a deep breath and let go of tension.",
  "Focus on the present moment, not the past or future.",
  "Celebrate small wins every day.",
  "Practice gratitude and list three things you're thankful for.",
  "Take a break and go for a walk outside.",
  "Smile, even if it feels forced. It can boost your mood.",
  "Surround yourself with positive people.",
  "Listen to your favorite music.",
  "Try a new hobby or activity to break the routine.",
  "Remind yourself that it's okay to not be okay sometimes.",
  "Drink water and stay hydrated.",
  "Take time to meditate or practice mindfulness.",
  "Write down your feelings in a journal.",
  "Be kind to yourself and avoid negative self-talk.",
  "Set achievable goals for the day.",
  "Do something creative: draw, write, paint, etc.",
  "Laugh, watch a funny video or a comedy show.",
  "Spend time with a pet or cuddle with someone you love.",
  "Get enough sleep and rest your mind.",
  "Exercise to release endorphins and reduce stress.",
  "Declutter your space to create a calming environment.",
  "Connect with someone you trust and talk it out.",
  "Try aromatherapy with calming scents like lavender.",
  "Eat something healthy and nourishing.",
  "Take a digital detox, even if it's just for an hour.",
  "Give yourself permission to relax and unwind.",
  "Focus on what you can control, not what you can't.",
  "Practice self-compassion and forgive yourself.",
  "Do something nice for someone else—it can lift your spirits.",
  "Try progressive muscle relaxation to release tension.",
  "Spend time in nature and breathe in fresh air.",
  "Focus on your strengths and what you're good at.",
  "Read an inspiring book or listen to an uplifting podcast.",
  "Visualize a peaceful place or a happy memory.",
  "Take a power nap to recharge your energy.",
  "Let go of perfectionism and embrace imperfection.",
  "Challenge negative thoughts and replace them with positive ones.",
  "Practice yoga to calm your mind and body.",
  "Engage in deep breathing exercises to reduce anxiety.",
  "Take a hot bath or shower to relax your muscles.",
  "Connect with a supportive community or group.",
  "Find humor in everyday situations.",
  "Take time to appreciate the beauty around you.",
  "Focus on one thing at a time to reduce overwhelm.",
  "Remember that your feelings are temporary and will pass.",
  "Ask for help when you need it—you're not alone.",
  "Give yourself a compliment or affirmation today.",
  "Let go of things that no longer serve you.",
  "Remember to be patient with yourself.",
  "Surround yourself with things that make you happy.",
  "Limit your exposure to negative news or social media.",
  "Remind yourself of your accomplishments and strengths.",
  "Take a moment to rest your eyes and stretch your body.",
  "Remember that it's okay to take things one step at a time.",
  "Treat yourself to something small that brings you joy.",
  "Set boundaries to protect your mental health.",
];

export function AppHeader(): JSX.Element {
  return (
    <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b bg-white px-4 dark:bg-slate-950">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="gap-3">
            <BreadcrumbPage>My Mood</BreadcrumbPage>
            <BreadcrumbPage>|</BreadcrumbPage>
            <BreadcrumbPage>
              {tips[Math.floor(Math.random() * tips.length)]}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  );
}

