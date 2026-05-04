#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/data/posts.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Extract old story between specific markers
const oldStoryStart = 'Today, I asked my father for permission, "Pa, mapa baybay anay ko, luya lawas calcal."';
const oldStoryEnd = 'As I pack my things to go home, suddenly, the wind breathes through my skin like a hug from the universe reminding me that life isn\'t as heavy as it seems, people aren\'t as difficult as they come, and wisdom lies in the courage to ask strangers "kumusta?"`;

const newStory = `Today, I asked my father, "Pa, mapa baybay anay ko, luya lawas Calcal." I went to the sea in search of perspective, inspiration, and a glimmer. With my camera slung over my shoulder, I made my way to the shore, silently hoping the sea would remind me that life is alright.

As I made my way to my secret spot, I noticed a crowd gathered by the beach. People stood patiently, witnessing fishermen and the community pulling fishnets with purpose. Hoping for <em>"bastante nga dawi,"</em> tubs and tubs of fish to feed their families. There were waves crashing, a rhythm in the waiting, and a kind of silence that spoke louder than words. I stopped. The photojournalist in me awoke. This wasn't just a scene to capture; it was a story waiting to be heard.

I asked around and learned they were doing <em>"sinsoro,"</em> a communal fishing, nets pulled together, not only for food but also for the community. That's when I met Tatay Pedro, a tumandok fisherfolk from San Fernando, a simple man who leads a simple life. He is a husband who loves, a father who provides, a grandfather who cares, and a member of a community that serves.

In a society where success is defined by accomplishments, wealth, fame, and hierarchy, there lives a community tucked in my hometown that lives with the quiet purpose of resilience and contentment. In that moment, I found <em>"perspective."</em>

As our conversation flowed gently like the waves crashing by the shore, I could not help but ask, "May ginahandum pa ikaw sa pagpangabuhi, Tay?" He smiled with quiet grace. His leathery face, lined with wrinkles around the eyes, held a soft, melancholy expression that whispered, "As long as my children live a better life than I did, my life's purpose is fulfilled."

His words left me with a heart refueled with humility and passion. My soul was deeply touched, reflected on how a stranger by the shore, whose truth felt so close to home, will forever make a mark on my soul. In that moment, he reminded me of what truly matters in life. That's when I found <em>"inspiration."</em>

As the sun set, Tatay Pedro stood still with a rope in his hand and his family's future in his heart. As he looked at the rays of sunlight, finishing a day's work with a heavy heart, not by sorrow but with great gratitude for his life's purpose unfolding as he had hoped. That's when I found a <em>"glimmer to get going."</em>

I packed my things to go home, the wind breathed through my skin like a hug from the universe, reminding me that life isn't as heavy as it seems, people aren't as difficult as they seem, and wisdom lies in the courage to ask strangers, "Kumusta?"

Perhaps life is not simply black and white. Maybe it's like the gradient hues of a sunset, bold, chaotic, almost a mess. Yet, with a slight change of perspective we come to see it as a "beautiful mess."

In Tatay Pedro's understanding, life was never fair. Some people received diplomas; Tatay Pedro received <em>"fishnets,</em> tangled, worn, and uncertain. Still, he found purpose in serving his family and community.

As he shared his legacy with me, I hope you, as readers, will also find perspective in the communal fishing practice of <em>"sinsoro."</em> Life is not meant to be carried alone. In the hands of a community that's woven with purpose, resilience, and the quiet grace of contentment, even the heaviest fishnets become lighter.`;

const startIdx = content.indexOf(oldStoryStart);
const endIdx = content.indexOf(oldStoryEnd) + oldStoryEnd.length;

if (startIdx !== -1 && endIdx > startIdx) {
  content = content.substring(0, startIdx) + newStory + content.substring(endIdx);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('✓ Story updated successfully!');
} else {
  console.log('✗ Could not find story boundaries');
  console.log('Start index:', startIdx);
  console.log('End index:', endIdx);
}
