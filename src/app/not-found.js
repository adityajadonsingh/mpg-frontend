import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <section class="page-404">
		<div class="wrapper">
			<span class="back-text">404</span>
			<h1 class="inn-text">It looks like nothing was found at this location. Maybe try a search?</h1>
            <Link href="/">
            <button className="py-2 px-10 rounded bg-[#f36c23] hover:bg-[#f36c23cb] mt-5 text-white font-semibold cursor-pointer">Back To Home</button>
            </Link>
		</div>
	</section>
    </>
  );
}
