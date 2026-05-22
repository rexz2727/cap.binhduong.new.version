import { type StructureResolver } from "sanity/structure";
import {
  BellIcon,
  DocumentIcon,
  UsersIcon,
  ImagesIcon,
  WarningOutlineIcon,
} from "@sanity/icons";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Nội dung")
    .items([
      S.listItem()
        .title("Tin tức & Thông báo")
        .icon(BellIcon)
        .child(
          S.list()
            .title("Tin tức & Thông báo")
            .items([
              S.documentTypeListItem("newsPost").title("Tin tức"),
              S.documentTypeListItem("announcement").title("Thông báo"),
              S.documentTypeListItem("goodDeed").title("Người tốt việc tốt"),
            ])
        ),

      S.divider(),

      S.listItem()
        .title("Văn bản & Thủ tục")
        .icon(DocumentIcon)
        .child(
          S.list()
            .title("Văn bản & Thủ tục")
            .items([
              S.documentTypeListItem("legalDocument").title("Văn bản pháp luật"),
              S.documentTypeListItem("draftDocument").title("Dự thảo văn bản"),
              S.documentTypeListItem("procedure").title("Thủ tục hành chính"),
            ])
        ),

      S.divider(),

      S.listItem()
        .title("Nhân sự & Tiếp công dân")
        .icon(UsersIcon)
        .child(
          S.list()
            .title("Nhân sự & Tiếp công dân")
            .items([
              S.documentTypeListItem("personnel").title("Nhân sự"),
              S.documentTypeListItem("citizenSchedule").title("Lịch tiếp công dân"),
            ])
        ),

      S.divider(),

      S.listItem()
        .title("Thư viện")
        .icon(ImagesIcon)
        .child(
          S.list()
            .title("Thư viện")
            .items([
              S.documentTypeListItem("photoAlbum").title("Thư viện ảnh"),
              S.documentTypeListItem("video").title("Video"),
            ])
        ),

      S.divider(),

      S.listItem()
        .title("Tương tác & An ninh")
        .icon(WarningOutlineIcon)
        .child(
          S.list()
            .title("Tương tác & An ninh")
            .items([
              S.documentTypeListItem("qna").title("Hỏi đáp"),
              S.documentTypeListItem("wantedPerson").title("Truy nã"),
            ])
        ),
    ]);
