import Image from "next/image";

export default function MessageBox() {
  return (
  <>
    <section className="messageBox">
        <div className="wrapper">
            <div className="box grid grid-cols-[150px_1fr] gap-4">
                <div className="img-box relative">
                    <Image
                        src="/media/leaf.png"
                        fill
                        style={{ objectFit: "contain" }}
                    />
                </div>
            </div>
        </div>
    </section>
  </>
  );
}
