import Image from "next/image";

export default function MessageBox() {
  return (
  <>
    <section className="messageBox">
        <div className="wrapper">
            <div className="box grid lg:grid-cols-[300px_1fr] md:grid-cols-[200px_1fr] gap-4 items-center">
                <div className="img-box relative">
                    <Image
                        src="/media/leaf.png"
                        alt="leaf"
                        fill
                        style={{ objectFit: "contain" }}
                    />
                </div>
                <div className="content h-fit md:text-start text-center">
                    <h3>Welcome to a greeneer future</h3>
                    <p>At MPG Stone, we are dedicated to transforming nature’s finest raw materials into breathtaking architectural masterpieces. Our commitment to quality craftsmanship and unparalleled service has established us as a premier name in the natural stone industry.</p>
                </div>
            </div>
        </div>
    </section>
  </>
  );
}
