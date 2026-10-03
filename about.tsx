import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui-bits";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "من نحن والشروط | هواتف أدرار" },
      { name: "description", content: "عن منصة هواتف أدرار، الشروط وسياسة الخصوصية وتسجيل المحلات." },
      { property: "og:title", content: "من نحن | هواتف أدرار" },
      { property: "og:description", content: "عن منصة هواتف أدرار وشروط الاستخدام." },
    ],
  }),
  component: () => (
    <div className="mx-auto max-w-2xl space-y-4 text-sm leading-relaxed">
      <PageHeader title="عن هواتف أدرار" />
      <p>هواتف أدرار دليل يربط الزبائن بمحلات الهواتف في ولاية أدرار. نساعدك على مقارنة الأسعار ومعرفة المتوفر والتواصل مباشرة مع المحل.</p>
      <h2 className="text-lg font-black">الشروط</h2>
      <ul className="list-disc space-y-1 ps-5 text-muted-foreground">
        <li>المنصة لا تملك المنتجات ولا تبيعها.</li>
        <li>المحلات مسؤولة عن الأسعار والمخزون ومعلومات المنتجات.</li>
        <li>يظهر دائمًا وقت آخر تحديث للمعلومات.</li>
      </ul>
      <h2 className="text-lg font-black">الخصوصية</h2>
      <p className="text-muted-foreground">المفضلة والمقارنة تُحفظ حاليًا على جهازك فقط.</p>
      <h2 className="text-lg font-black">تسجيل المحلات</h2>
      <p className="text-muted-foreground">تسجيل المحلات سيفتح قريبًا.</p>
    </div>
  ),
});
