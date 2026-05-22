import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { WantedPerson } from "@/types/wantedPerson";

interface Props {
  person: WantedPerson;
}

export default function WantedCard({ person }: Props) {
  const caught = person.status === "da-bat";

  return (
    <div className={`wanted-card${caught ? " caught" : ""}`}>
      <div className="photo">
        {person.photo ? (
          <Image
            src={urlFor(person.photo).width(400).height(300).url()}
            alt={person.fullName}
            fill
            className="object-cover object-top"
          />
        ) : null}
        <span className="status-pill">
          {caught ? "Đã bắt" : "Đang truy nã"}
        </span>
      </div>
      <div className="body">
        <h4>{person.fullName}</h4>
        <dl>
          {(person.birthYear || person.hometown) && (
            <>
              <dt>Năm sinh</dt>
              <dd>
                {person.birthYear ?? "—"}
                {person.hometown ? ` · ${person.hometown}` : ""}
              </dd>
            </>
          )}
          <dt>Tội danh</dt>
          <dd className="crime">{person.crime}</dd>
          {person.warrantDate && (
            <>
              <dt>Ngày phát lệnh</dt>
              <dd>{new Date(person.warrantDate).toLocaleDateString("vi-VN")}</dd>
            </>
          )}
          {person.warrantAgency && (
            <>
              <dt>Cơ quan</dt>
              <dd>{person.warrantAgency}</dd>
            </>
          )}
        </dl>
      </div>
    </div>
  );
}
