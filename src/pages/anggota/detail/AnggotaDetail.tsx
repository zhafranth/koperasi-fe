import BackButton from "@/components/BackButton";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetAnggotaDetail } from "@/networks/anggota";
import { formatDate } from "date-fns";
import { id as formatID } from "date-fns/locale";
import {
  CalendarDays,
  Mail,
  MapPin,
  Phone,
  User,
  UserCircle,
} from "lucide-react";
import { useParams } from "react-router-dom";

const AnggotaDetail = () => {
  const { id } = useParams();
  const { data } = useGetAnggotaDetail(Number(id));
  const {
    nama,
    alamat,
    email,
    nik,
    no_telepon,
    saldo_simpanan,
    tanggal_bergabung,
    username,
    jumlah_pinjaman,
    simpanan = [],
    pinjaman = [],
  } = data ?? {};
  return (
    <div className="p-6 space-y-6">
      <BackButton />

      <Card className="w-full mx-auto py-0 overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
        <CardHeader className="border-b h-full bg-gradient-to-r from-blue-50 to-blue-100 pb-1! py-4 ">
          <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <UserCircle className="h-4 w-4 text-blue-500" />
            Informasi Anggota
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex gap-x-4">
                <div className="flex items-center w-1/3 gap-2 text-gray-500">
                  <UserCircle className="h-4 w-4" />
                  <span className="text-xs font-medium">Nama Lengkap</span>
                </div>
                <p className="text-sm font-semibold">{nama}</p>
              </div>

              <div className="flex gap-x-4">
                <div className="flex items-center w-1/3 gap-2 text-gray-500">
                  <User className="h-4 w-4" />
                  <span className="text-xs font-medium">Username</span>
                </div>
                <p className="text-sm font-semibold">{username || "-"}</p>
              </div>

              <div className="flex gap-x-4">
                <div className="flex items-center w-1/3 gap-2 text-gray-500">
                  <CalendarDays className="h-4 w-4" />
                  <span className="text-xs font-medium">Tanggal Bergabung</span>
                </div>
                <p className="text-sm font-semibold">
                  {tanggal_bergabung
                    ? formatDate(tanggal_bergabung, "dd MMM yyyy")
                    : "-"}
                </p>
              </div>

              <div className="flex gap-x-4">
                <div className="flex items-center w-1/3 gap-2 text-gray-500">
                  <User className="h-4 w-4" />
                  <span className="text-xs font-medium">NIK</span>
                </div>
                <p className="text-sm font-semibold">{nik || "-"}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex gap-x-4">
                <div className="flex items-center w-1/3 gap-2 text-gray-500">
                  <Phone className="h-4 w-4" />
                  <span className="text-xs font-medium">No. Telepon</span>
                </div>
                <p className="text-sm font-semibold">{no_telepon || "-"}</p>
              </div>

              <div className="flex gap-x-4">
                <div className="flex items-center w-1/3 gap-2 text-gray-500">
                  <Mail className="h-4 w-4" />
                  <span className="text-xs font-medium">Email</span>
                </div>
                <p className="text-sm font-semibold">{email || "-"}</p>
              </div>

              <div className="flex gap-x-4">
                <div className="flex items-center w-1/3 gap-2 text-gray-500">
                  <MapPin className="h-4 w-4" />
                  <span className="text-xs font-medium">Alamat</span>
                </div>
                <p className="text-sm font-semibold">{alamat || "-"}</p>
              </div>
            </div>
          </div>

          <div className="border-t pt-6 mt-4">
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group">
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-emerald-600/70 mb-1">
                    Total Simpanan
                  </span>
                  <span className="text-2xl font-bold text-emerald-600 group-hover:text-emerald-700 transition-colors">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(saldo_simpanan || 0)}
                  </span>
                </div>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group">
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-red-600/70 mb-1">
                    Total Pinjaman
                  </span>
                  <span className="text-2xl font-bold text-red-600 group-hover:text-red-700 transition-colors">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(jumlah_pinjaman || 0)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-white p-4 rounded-md">
        <Tabs defaultValue="simpanan" className="w-full">
          <TabsList className="flex w-full h-12 gap-2 p-1  bg-blue-50 rounded-lg">
            <TabsTrigger
              value="simpanan"
              className="flex-1 px-6 py-3 text-sm font-medium text-blue-700 rounded-md data-[state=active]:bg-blue-700 data-[state=active]:text-white data-[state=active]:shadow-sm transition-all duration-300 hover:bg-blue-400 hover:text-white"
            >
              Simpanan
            </TabsTrigger>
            <TabsTrigger
              value="pinjaman"
              className="flex-1 px-6 py-3 text-sm font-medium text-blue-700 rounded-md data-[state=active]:bg-blue-700 data-[state=active]:text-white data-[state=active]:shadow-sm transition-all duration-300 hover:bg-blue-400 hover:text-white"
            >
              Pinjaman
            </TabsTrigger>
          </TabsList>
          <TabsContent value="simpanan">
            <div className="mt-6">
              {simpanan?.map((item) => (
                <Card
                  key={item.id}
                  className="px-6 border-blue-300 cursor-pointer hover:bg-blue-50 mb-4 transition-all"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-blue-100 text-blue-700 rounded-full">
                        Iuran Bualan
                      </Badge>
                      <p className="text-xl text-neutral-800 font-semibold">
                        {formatDate(new Date(item.tanggal), "MMMM yyyy", {
                          locale: formatID,
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-xl font-semibold text-blue-500">
                        {item.jumlah.toLocaleString("id-ID", {
                          maximumFractionDigits: 0,
                          minimumFractionDigits: 0,
                        })}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="pinjaman">
            <div className="mt-6">
              {pinjaman?.map((item) => (
                <Card
                  key={`pinjaman-${item.id}`}
                  className="px-6 py-4 border-blue-300 cursor-pointer hover:bg-blue-50 mb-4 transition-all"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-neutral-500">10 Mei 2024</p>
                      <p className="text-xl text-neutral-800 font-semibold">
                        {item.keterangan}
                      </p>
                    </div>
                    <div className="flex gap-x-4 items-center">
                      <Badge className="bg-green-100 text-green-700 rounded-full">
                        {item.status}
                      </Badge>
                      <p className="text-xl font-semibold text-blue-500">
                        {item.jumlah.toLocaleString("id-ID", {})}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AnggotaDetail;
