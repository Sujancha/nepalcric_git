import type { Metadata, ResolvingMetadata } from "next";
import StoryArticleClient from "./StoryArticleClient";

// Mock data for the story
const mockStory = {
    title: "त्यो अन्तिम ओभर, जसले सङ्घर्षको परिभाषा बदल्यो",
    author: "दीपेन्द्र सिंह ऐरी",
    date: "मार्च ७, २०२६",
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    content: `
    <p>क्रिकेट मैदानको बीचमा उभिंदा लाग्छ, यो केवल २२ यार्डको पिच होइन। यो त लाखौं नेपालीको सपना, आशा र सङ्घर्षको मञ्च हो। जब म ब्याट समातेर क्रीजमा जान्छु, म एक्लो हुन्न। मलाई पूरा देशले हेरिरहेको हुन्छ।</p>
    
    <p>त्यो दिन युएईविरुद्धको म्याचमा दबाब सानो थिएन। लक्ष्य ठूलो थियो, विकेट गुम्दै थिए, र रन रेटले आकाश छुँदै थियो। तर ड्रेसिङ रुममा एउटा फरक ऊर्जा थियो। हामीले एकअर्कालाई हेर्‍यौं र भन्यौं, 'यो मात्र एउटा खेल हो, तर हाम्रा लागि यो जीवन हो।' त्यो ओभर... त्यो अन्तिम ओभरले क्रिकेटको इतिहास मात्र लेखेन, हाम्रो भविष्य पनि कोर्‍यो।</p>

    <blockquote>हामीलाई थाहा थियो कि हामीसँग गुमाउन केही छैन, तर जित्नका लागि पूरा विश्व छ। त्यो क्षणमा सबै डरहरू हराए, र बाँकी रह्यो त केवल एउटा संकल्प—जसरी भए पनि जित्ने।</blockquote>

    <p>जब बल बलरको हातबाट निस्कियो, समय रोकिए जस्तो लाग्यो। ब्याट र बलको सम्पर्कको त्यो आवाज... त्यो आवाजले मैदानमा रहेका हजारौं फ्यानहरूको मुटुको धड्कनलाई प्रतिध्वनित गर्यो। बल बाउन्ड्री पार गर्दा जुन गर्जन सुनियो, त्यो केवल खुसी थिएन, त्यो वर्षौंको सङ्घर्षपछिको मुक्ति थियो।</p>

    <p>नेपाली क्रिकेटको यो यात्रा अझै लामो छ। हामी अझै सिक्दैछौं, अझै बढ्दैछौं। तर एउटा कुरा पक्का छ: अब हामी पछाडि फर्केर हेर्ने छैनौं। किनकि हाम्रा अगाडि खुल्ला आकाश छ, र हामी उड्न तयार छौं।</p>
  `
};

export async function generateMetadata(
    { params }: { params: any },
    parent: ResolvingMetadata
): Promise<Metadata> {
    // In a real app, you would fetch real data based on params.slug
    const story = mockStory;

    return {
        title: story.title,
        description: story.content.substring(7, 120) + "...", // Quick mock extraction
        openGraph: {
            type: "article",
            locale: "ne_NP",
            images: [story.image],
        },
        twitter: {
            card: "summary_large_image",
        },
    };
}

export default function StoryArticlePage({ params }: { params: any }) {
    return <StoryArticleClient story={mockStory} />;
}
