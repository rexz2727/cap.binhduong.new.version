import type { Metadata } from "next";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import { getPersonnel } from "@/sanity/lib/queries";
import { SITE } from "@/constants/site";
import PageHeader from "@/components/ui/PageHeader";
import GioiThieuTabs from "@/components/sections/GioiThieuTabs";

export const metadata: Metadata = {
  title: "Giới thiệu",
  description: "Giới thiệu về Công an phường Bình Dương và ban lãnh đạo đơn vị",
};

const builder = imageUrlBuilder(client);

export default async function AboutPage() {
  const personnel = await getPersonnel();

  return (
    <>
      <PageHeader
        title="Giới thiệu Đơn vị"
        breadcrumbs={[{ label: "Giới thiệu" }]}
      />
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
        {/* Sub-tabs: Chức năng - Sơ đồ tổ chức - Lịch tiếp công dân */}
        <GioiThieuTabs />

        <section>
          <h2 className="text-2xl font-bold text-police-navy mb-4">Về chúng tôi</h2>
          <div className="prose prose-gray max-w-none">
            <p>
              <strong>Công an phường Bình Dương</strong> là đơn vị trực thuộc Công an
              thành phố Thủ Dầu Một, tỉnh Bình Dương. Đơn vị được thành lập trên cơ sở
              sáp nhập các phường Hòa Phú, Phú Mỹ, Phú Tân và Phú Chánh theo chủ trương
              sắp xếp đơn vị hành chính của tỉnh Bình Dương.
            </p>
            <p>
              Nhiệm vụ chính của đơn vị là bảo đảm an ninh trật tự, phòng chống tội phạm
              và phục vụ nhân dân trên địa bàn phường Bình Dương.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {["Hòa Phú", "Phú Mỹ", "Phú Tân", "Phú Chánh"].map((ward) => (
              <div key={ward} className="bg-police-red/5 border border-police-red/20 rounded-lg p-4 text-center">
                <p className="font-semibold text-police-red">{ward}</p>
                <p className="text-xs text-gray-500 mt-1">Đơn vị sáp nhập</p>
              </div>
            ))}
          </div>
        </section>

        {personnel.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-police-navy mb-6">Ban Lãnh đạo</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {personnel.map((person) => {
                const photoUrl = person.photo
                  ? builder.image(person.photo).width(300).height(400).url()
                  : null;
                return (
                  <div key={person._id} className="text-center">
                    <div className="relative w-40 h-52 mx-auto rounded-lg overflow-hidden bg-gray-100 mb-3">
                      {photoUrl ? (
                        <Image
                          src={photoUrl}
                          alt={person.fullName}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-4xl">
                          👮
                        </div>
                      )}
                    </div>
                    <p className="font-bold text-gray-900">{person.fullName}</p>
                    <p className="text-sm text-police-red">{person.rank}</p>
                    <p className="text-sm text-gray-500">{person.position}</p>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        <section className="bg-gray-50 rounded-xl p-6">
          <h2 className="text-xl font-bold text-police-navy mb-4">Thông tin liên hệ</h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div>
              <dt className="font-medium text-gray-500">Địa chỉ</dt>
              <dd>{SITE.address}</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-500">Điện thoại</dt>
              <dd>{SITE.phone}</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-500">Email</dt>
              <dd>{SITE.email}</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-500">Giờ làm việc</dt>
              <dd>{SITE.workingHours}</dd>
            </div>
          </dl>
        </section>
      </div>
    </>
  );
}
