import { ServiceCategory } from "../data/servicesData";

function isNonEmptyString(val: any): boolean {
  return typeof val === "string" && val.trim().length > 0;
}

export function sanitizeServices(initialList: ServiceCategory[], overrideList: any): ServiceCategory[] {
  if (!Array.isArray(overrideList) || overrideList.length === 0) return initialList;

  const updatedInitial = initialList.map((initialItem) => {
    const match = overrideList.find((p: any) => p && p.slug === initialItem.slug);
    if (!match) return initialItem;

    return {
      ...initialItem,
      ...match,
      title: isNonEmptyString(match?.title) ? match.title.trim() : initialItem.title,
      breadcrumbTitle: isNonEmptyString(match?.breadcrumbTitle) ? match.breadcrumbTitle.trim() : initialItem.breadcrumbTitle,
      detailTitle: isNonEmptyString(match?.detailTitle) ? match.detailTitle.trim() : initialItem.detailTitle,
      shortDescription: isNonEmptyString(match?.shortDescription) ? match.shortDescription.trim() : initialItem.shortDescription,
      description: isNonEmptyString(match?.description) ? match.description.trim() : initialItem.description,
      longDescription: isNonEmptyString(match?.longDescription) ? match.longDescription.trim() : (initialItem as any).longDescription,
      icon: isNonEmptyString(match?.icon) ? match.icon : initialItem.icon,
      image: isNonEmptyString(match?.image) ? match.image : (initialItem as any).image,
      featuredImage: isNonEmptyString(match?.featuredImage) ? match.featuredImage : initialItem.featuredImage,
      bgImage: isNonEmptyString(match?.bgImage) ? match.bgImage : initialItem.bgImage,
      services: Array.isArray(match?.services) && match.services.length > 0 ? match.services : initialItem.services,
      features: Array.isArray(match?.features) && match.features.length > 0 ? match.features : initialItem.features,
      benefits: Array.isArray(match?.benefits) && match.benefits.length > 0 ? match.benefits : initialItem.benefits,
      processSteps: Array.isArray(match?.processSteps) && match.processSteps.length > 0 ? match.processSteps : initialItem.processSteps,
      targetSpaces: Array.isArray(match?.targetSpaces) && match.targetSpaces.length > 0 ? match.targetSpaces : initialItem.targetSpaces,
      whyChooseAdvantages: Array.isArray(match?.whyChooseAdvantages) && match.whyChooseAdvantages.length > 0 ? match.whyChooseAdvantages : initialItem.whyChooseAdvantages,
      whyChooseChallenges: Array.isArray(match?.whyChooseChallenges) && match.whyChooseChallenges.length > 0 ? match.whyChooseChallenges : initialItem.whyChooseChallenges,
      serviceAreas: Array.isArray(match?.serviceAreas) && match.serviceAreas.length > 0 ? match.serviceAreas : (initialItem as any).serviceAreas,
      faqs: Array.isArray(match?.faqs) && match.faqs.length > 0 ? match.faqs : initialItem.faqs,
    };
  });

  const additionalItems = overrideList.filter(
    (item: any) => item && item.slug && !initialList.some((init) => init.slug === item.slug)
  );

  return [...updatedInitial, ...additionalItems];
}
