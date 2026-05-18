import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { WantedPerson } from "@/types/wantedPerson";

interface Props {
  person: WantedPerson;
}

export default function WantedCard({ person }: Props) {
  return (
    <div className="bg-white border border-red-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative h-48 bg-gray-100">
        {person.photo ? (
          <Image
            src={urlFor(person.photo).width(400).height(300).url()}
            alt={person.fullName}
            fill
            className="object-cover object-top"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl text-gray-300">
            👤
          </div>
        )}
        <div className="absolute top-3 right-3">
          <span
            className={`text-[10px] font-extrabold px-2 py-1 rounded-full uppercase tracking-wider ${
              person.status === "dang-truy-na"
                ? "bg-police-red text-white"
                : "bg-green-600 text-white"
            }`}
          >
            {person.status === "dang-truy-na" ? "Đang truy nã" : "Đã bắt"}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-police-navy text-base mb-1">{person.fullName}</h3>
        {person.aliases && person.aliases.length > 0 && (
          <p className="text-xs text-gray-500 mb-2">Bí danh: {person.aliases.join(", ")}</p>
        )}

        <div className="space-y-1 text-xs text-gray-600">
          {person.birthYear && (
            <p><span className="font-medium text-gray-500">Năm sinh:</span> {person.birthYear}</p>
          )}
          {person.hometown && (
            <p><span className="font-medium text-gray-500">Quê quán:</span> {person.hometown}</p>
          )}
          <p>
            <span className="font-medium text-gray-500">Tội danh:</span>{" "}
            <span className="text-police-red font-semibold">{person.crime}</span>
          </p>
          {person.warrantDate && (
            <p>
              <span className="font-medium text-gray-500">Ngày phát lệnh:</span>{" "}
              {new Date(person.warrantDate).toLocaleDateString("vi-VN")}
            </p>
          )}
          {person.warrantAgency && (
            <p><span className="font-medium text-gray-500">Cơ quan:</span> {person.warrantAgency}</p>
          )}
        </div>

        {person.status === "dang-truy-na" && (
          <div className="mt-4 bg-red-50 border border-red-100 rounded-lg p-3 text-xs text-red-700">
            <strong>Nếu phát hiện, hãy báo ngay:</strong> 113 hoặc Công an phường Bình Dương
          </div>
        )}
      </div>
    </div>
  );
}
