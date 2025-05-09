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
import { TrackSubmitButton } from "./submit-track-button";
import { translateMood } from "../utils/translate-mood";
import { es } from "date-fns/locale";

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
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 gap-16 sm:w-[350px] lg:w-full">
        {" "}
        <div className="flex flex-col space-y-2 text-center">
          <h1
            className="text-4xl font-semibold tracking-tight text-text-primary"
            data-testid="create-track-title"
          >
            {format(date, "d 'de' MMMM 'de' yyyy", { locale: es })}
          </h1>
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
                    ¿Cómo te sientes hoy?
                  </FormLabel>
                  <FormControl className="ml-auto mr-auto">
                    <Carousel className="w-full max-w-xs flex flex-col gap-4">
                      <CarouselContent>
                        {Object.values(Mood).map((mood) => {
                          const translatedMood = translateMood(mood);

                          return (
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
                                        src={`/assets/mood/${translatedMood}.png`}
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
                                    {translatedMood}
                                  </span>
                                </div>
                              </div>
                            </CarouselItem>
                          );
                        })}
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
                    Escribe sobre tu día
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      id="description"
                      placeholder="¡Comparte los momentos más destacados de tu día! ¿Qué te hizo sonreír? ¿Qué aprendiste?"
                      data-testid="create-track-description-input"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                  <TrackSubmitButton
                    isLoading={isLoading}
                    id="create-track-button"
                    data-testid="create-track-submit-button"
                    className="w-full max-w-xs mx-auto"
                  />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </div>
  );
}
