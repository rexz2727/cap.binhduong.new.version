import type { Metadata } from "next";
import Link from "next/link";
import { getDraftDocuments } from "@/sanity/lib/queries";
import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Chính sách pháp luật | Công an phường Bình Dương",
  description: "Dự thảo văn bản, chính sách pháp luật đang được lấy ý kiến tại Công an phường Bình Dương.",
};

export default async function ChinhSachPhapLuatPage() {
  const docs = await getDraftDocuments();

  return (
    <>
      <PageHeader
        title="Chính sách pháp luật"
        breadcrumbs={[{ label: "Chính sách pháp luật" }]}
        description="Dự thảo văn bản đang lấy ý kiến và chính sách pháp luật mới ban hành"
      />
      <div className="max-w-4xl mx-auto px-4 py-10">
        {docs.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-5xl mb-3">📋</p>
            <p>Chưa có văn bản dự thảo nào.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {docs.map((doc) => {
              const isExpired = doc.deadline && new Date(doc.deadline) < new Date();
              return (
                <div
                  key={doc._id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col sm:flex-row gap-4 items-start"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                          isExpired
                            ? "bg-gray-100 text-gray-500"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {isExpired ? "Đã hết hạn" : "Đang lấy ý kiến"}
                      </span>
                      {doc.deadline && (
                        <span className="text-xs text-gray-400">
                          Hạn: {new Date(doc.deadline).toLocaleDateString("vi-VN")}
                        </span>
                      )}
                    </div>
                    <h2 className="font-semibold text-gray-900 text-sm leading-snug">
                      {doc.title}
                    </h2>
                    {doc.description && (
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{doc.description}</p>
                    )}
                  </div>
                  {doc.fileUrl && (
                    <Link
                      href={doc.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 flex items-center gap-1.5 bg-police-red hover:bg-police-red-dark text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Tải xuống
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
