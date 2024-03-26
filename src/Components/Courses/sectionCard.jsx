import "./sectionCard.css"

export default function SectionCard(element){
   // console.log(element);
    return (
        <div className="sectionCard">{element.data.sectionName}</div>

    );
}