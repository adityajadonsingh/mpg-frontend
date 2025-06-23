import ContactInfo from "@/components/contact-us/ContactInfo"
import ContactForm from "@/components/home/ContactForm"
import MiniBanner from "@/components/MiniBanner"

export default function ContactUsPage() {
    return (
        <>
            <MiniBanner bg_img={"https://html.kodesolution.com/2024/tilepro-html/images/background/page-title-bg.png"} pageName={"Contact Us"} />
            <ContactInfo />
            <ContactForm isContactPage={true} />
        </>
    )
}