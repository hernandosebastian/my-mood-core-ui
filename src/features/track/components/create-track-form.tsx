import * as React from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/Icons";
import { createTrackSchema } from "../schemas";
import { Mood } from "../enum";
import { format } from "date-fns";
import { useSelectedDate } from "@/features/calendar/hooks";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface ICreateTrackFormProps {
  form: UseFormReturn<
    {
      title: Mood;
      description?: string;
      date: Date;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    undefined
  >;
  onSubmit: (values: z.infer<typeof createTrackSchema>) => void;
  isLoading: boolean;
}

export function CreateTrackForm({
  form,
  onSubmit,
  isLoading,
}: Readonly<ICreateTrackFormProps>): JSX.Element {
  const date = useSelectedDate();

  const handleSubmit = async (e: React.SyntheticEvent): Promise<void> => {
    e.preventDefault();

    const result = await form.trigger();

    if (!result) {
      return;
    }

    const formData = form.getValues();
    formData.date = date;

    onSubmit(formData);
  };

  return (
    <div className="lg:p-8 text-black">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1
            className="text-2xl font-semibold tracking-tight"
            data-testid="create-track-title"
          >
            Track Your Mood | {format(date, "dd-MM-yyyy")}
          </h1>
          <p className="text-sm text-muted-foreground">
            Create your track and gain insights into your mood journey.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl className="ml-auto mr-auto">
                    <Carousel className="w-full max-w-xs flex flex-col gap-4">
                      <CarouselContent>
                        {Object.values(Mood).map((mood) => (
                          <CarouselItem key={mood.toString()}>
                            <div>
                              <Card
                                className={cn(
                                  field.value === mood && "border-stone-500"
                                )}
                              >
                                <CardContent className="flex aspect-square items-center justify-center p-6">
                                  <button
                                    type="button"
                                    onClick={() => field.onChange(mood)}
                                    className="w-full h-full"
                                    data-testid={`create-track-${mood}-button`}
                                    disabled={isLoading}
                                  >
                                    <span className="text-lg font-semibold">
                                      {mood}
                                    </span>
                                  </button>
                                </CardContent>
                              </Card>
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <div className="flex w-[35%] justify-between ml-auto mr-auto">
                        <CarouselPrevious
                          type="button"
                          data-testid="previous-button"
                          disabled={isLoading}
                        />
                        <CarouselNext
                          type="button"
                          data-testid="next-button"
                          disabled={isLoading}
                        />
                      </div>
                    </Carousel>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      id="description"
                      placeholder="Enter your description"
                      data-testid="create-track-description-input"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full"
              id="create-track-button"
              data-testid="create-track-submit-button"
            >
              {isLoading ? (
                <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Done
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
