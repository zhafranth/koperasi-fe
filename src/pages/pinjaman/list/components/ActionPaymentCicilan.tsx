import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useToggle from "@/hooks/useToggle";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { useIsPengurus } from "@/hooks/useAuth";

const formSchema = z.object({
  jumlah: z.number().min(1, "Jumlah is required"),
  tanggal: z.date({
    required_error: "Tanggal is required",
  }),
  keterangan: z.string().min(1, "Keterangan is required"),
});

const ActionPaymentCicilan = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const { isOpen, toggle } = useToggle();
  const isPengurus = useIsPengurus();

  if (!isPengurus) return null;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("values:", values);
  };

  return (
    <>
      <Button
        onClick={toggle}
        className="w-full rounded-full bg-blue-600 hover:bg-blue-500 hover:cursor-pointer text-white"
      >
        Bayar Cicilan
      </Button>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={toggle}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader className="flex flex-row items-center justify-between">
              <DialogTitle>Tambah Cicilan</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="jumlah"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jumlah</FormLabel>
                      <FormControl>
                        <Input placeholder="Masukkan jumlah" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tanggal"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Tanggal</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto p-0 z-50"
                          align="start"
                        >
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            captionLayout="dropdown"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="keterangan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Keterangan</FormLabel>
                      <FormControl>
                        <Input placeholder="Masukkan Keterangan" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={toggle}
                    className="hover:bg-gray-100 transition-colors duration-200"
                  >
                    Batal
                  </Button>
                  <Button
                    type="submit"
                    // disabled={!isValid}
                    className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    Simpan
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default ActionPaymentCicilan;
