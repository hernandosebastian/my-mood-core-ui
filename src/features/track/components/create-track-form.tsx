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
import { Card, CardContent } from "@/components/ui/card";
import { getMoodColor } from "../utils";
import { Textarea } from "@/components/ui/textarea";

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
    <div className="lg:p-8 w-full max-w-[1200px] self-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 gap-8 sm:w-[350px] lg:w-full">
        <div className="flex flex-col space-y-2 text-center">
          <h1
            className="text-2xl font-semibold tracking-tight text-text-primary"
            data-testid="create-track-title"
          >
            {format(date, "MMMM d, yyyy")}
          </h1>
          <p className="text-sm text-text-secondary">
            Record today&apos;s mood and build your personal emotional wellness
            journey.
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={handleSubmit}
            className="space-y-8 flex flex-col lg:flex-row gap-16 lg:gap-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="lg:flex lg:flex-col lg:gap-4 lg:w-[60%] xl:w-[50%] text-center">
                  <FormLabel className="text-text-primary text-lg">
                    How are you feeling today?
                  </FormLabel>
                  <FormControl className="ml-auto mr-auto">
                    <Carousel className="w-full max-w-xs flex flex-col gap-4">
                      <CarouselContent>
                        {Object.values(Mood).map((mood) => (
                          <CarouselItem key={mood.toString()}>
                            <div className="border-border-primary">
                              <Card
                                style={{
                                  borderColor:
                                    field.value === mood
                                      ? getMoodColor(mood)
                                      : "inherit",
                                }}
                                className="bg-background-primary"
                              >
                                <CardContent className="flex aspect-square items-center justify-center bg-background-secondary border-border-primary rounded-xl">
                                  <button
                                    type="button"
                                    onClick={() => field.onChange(mood)}
                                    className="w-full h-full p-6"
                                    data-testid={`create-track-${mood}-button`}
                                    disabled={isLoading}
                                  >
                                    <img
                                      src={`/assets/mood/${mood}.png`}
                                      alt={mood}
                                      className="w-full h-full object-contain"
                                    />
                                  </button>
                                </CardContent>
                              </Card>
                              <div className="text-center mt-2">
                                <span
                                  className="text-base font-medium"
                                  style={{
                                    color:
                                      field.value === mood
                                        ? getMoodColor(mood)
                                        : "inherit",
                                  }}
                                >
                                  {mood}
                                </span>
                              </div>
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>

                      <div className="flex w-[35%] justify-between ml-auto mr-auto">
                        <CarouselPrevious
                          type="button"
                          data-testid="previous-button"
                          className="border-border-primary bg-background-secondary text-text-secondary hover:bg-background-primary hover:text-text-primary"
                          disabled={isLoading}
                        />
                        <CarouselNext
                          type="button"
                          data-testid="next-button"
                          className="border-border-primary bg-background-secondary text-text-secondary hover:bg-background-primary hover:text-text-primary"
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
                <FormItem className="flex flex-col gap-6 lg:w-[40%] xl:w-[50%] !mt-0 text-center lg:h-fit">
                  <FormLabel className="text-text-primary text-lg">
                    Write about your day
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      id="description"
                      placeholder="Share the highlights of your day! What made you smile? What did you learn?"
                      data-testid="create-track-description-input"
                      className="text-text-secondary overflow-auto max-w-full mx-auto !my-[1px]"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full max-w-xs mx-auto"
                    id="create-track-button"
                    data-testid="create-track-submit-button"
                  >
                    {isLoading ? (
                      <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    Done
                  </Button>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </div>
  );
}
