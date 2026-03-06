import SectionLayout from "../../molecules/sectionLayout/sectionLayout";

export default function SectionLayoutStack({
  sections = [],
  gap = "var(--layoutSpacing)", // spacing between each SectionLayout
  align = "stretch",
  paddingBottom = "var(--layoutSpacing)",
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap, alignItems: align, paddingBottom: paddingBottom }}>
      {sections.map((section, index) => {
        const {
          children,
          height,
          minHeight,
          sectionHeight,
          display,
          placeItems,
          paddingBottom = "0",
          ...rest
        } = section;

        return (
          <SectionLayout
            key={section.key ?? index}
            height={height}
            minHeight={minHeight}
            sectionHeight={sectionHeight}
            display={display}
            placeItems={placeItems}
            paddingBottom={paddingBottom}
            {...rest}
          >
            {children}
          </SectionLayout>
        );
      })}
    </div>
  );
}
