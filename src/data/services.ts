import type { IconName } from "../components/ui/Icon";

export interface Service {
  icon: IconName;
  title: string;
  description: string;
}

export const services: Service[] = [
  {
    icon: "scissors",
    title: "Pet Kuaför",
    description:
      "Profesyonel tıraş, yıkama, tüy bakımı ve tırnak kesimi ile dostunuz tertemiz.",
  },
  {
    icon: "home",
    title: "Pet Pansiyon",
    description:
      "Tatildeyken dostunuz güvenli, sıcak ve eğlenceli bir ortamda ağırlanır.",
  },
  {
    icon: "stethoscope",
    title: "Veteriner Danışma",
    description:
      "Beslenme ve genel sağlık konusunda anlaşmalı veterinerlerimizden destek.",
  },
  {
    icon: "truck",
    title: "Aynı Gün Teslimat",
    description:
      "İnegöl içi siparişlerin aynı gün, özenle kapına kadar gelir.",
  },
  {
    icon: "graduation",
    title: "Eğitim Desteği",
    description:
      "Yavru sosyalleşmesi ve temel itaat eğitimi için uzman yönlendirmesi.",
  },
  {
    icon: "gift",
    title: "Sadakat Programı",
    description:
      "Her alışverişte puan kazan, bir sonraki siparişinde indirim olarak kullan.",
  },
];
