import ExtraPages from "@/components/ExtraPages";
import { getExtraPageContent } from "@/lib/api/extraPages";

export default async function termsConditionPage() {
    const content = await getExtraPageContent("terms");
    return (<>

        <ExtraPages pageName={"Terms & Conditions"} content={content} />

    </>)
}