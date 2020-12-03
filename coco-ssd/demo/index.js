/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
import * as cocoSsd from '@tensorflow-models/coco-ssd'
import * as cpu from '@tensorflow/tfjs-backend-cpu'
import * as webgl from '@tensorflow/tfjs-backend-webgl'

import image1URL from './images/test-set-2/051.jpeg';
import image2URL from './images/test-set-2/052.jpeg';
import image3URL from './images/test-set-2/053.jpeg';
import image4URL from './images/test-set-2/054.jpeg';
import image5URL from './images/test-set-2/055.jpeg';
import image6URL from './images/test-set-2/056.jpeg';
import image7URL from './images/test-set-2/057.jpeg';
import image8URL from './images/test-set-2/058.jpeg';
import image9URL from './images/test-set-2/059.jpeg';
import image10URL from './images/test-set-2/060.jpeg';
import image11URL from './images/test-set-2/061.jpeg';
import image12URL from './images/test-set-2/062.jpeg';
import image13URL from './images/test-set-2/063.jpeg';
import image14URL from './images/test-set-2/064.jpeg';
import image15URL from './images/test-set-2/065.jpeg';
import image16URL from './images/test-set-2/066.jpeg';
import image17URL from './images/test-set-2/067.jpeg';
import image18URL from './images/test-set-2/068.jpeg';
import image19URL from './images/test-set-2/069.jpeg';
import image20URL from './images/test-set-2/070.jpeg';
import image21URL from './images/test-set-2/071.jpeg';
import image22URL from './images/test-set-2/072.jpeg';
import image23URL from './images/test-set-2/073.jpeg';
import image24URL from './images/test-set-2/074.jpeg';
import image25URL from './images/test-set-2/075.jpeg';
import image26URL from './images/test-set-2/076.jpeg';
import image27URL from './images/test-set-2/077.jpeg';
import image28URL from './images/test-set-2/078.jpeg';
import image29URL from './images/test-set-2/079.jpeg';
import image30URL from './images/test-set-2/080.jpeg';
import image31URL from './images/test-set-2/081.jpeg';
import image32URL from './images/test-set-2/082.jpeg';
import image33URL from './images/test-set-2/083.jpeg';
import image34URL from './images/test-set-2/084.jpeg';
import image35URL from './images/test-set-2/085.jpeg';
import image36URL from './images/test-set-2/086.jpeg';
import image37URL from './images/test-set-2/087.jpeg';
import image38URL from './images/test-set-2/088.jpeg';
import image39URL from './images/test-set-2/089.jpeg';
import image40URL from './images/test-set-2/090.jpeg';
import image41URL from './images/test-set-2/091.jpeg';
import image42URL from './images/test-set-2/092.jpeg';
import image43URL from './images/test-set-2/093.jpeg';
import image44URL from './images/test-set-2/094.jpeg';
import image45URL from './images/test-set-2/095.jpeg';
import image46URL from './images/test-set-2/096.jpeg';
import image47URL from './images/test-set-2/097.jpeg';
import image48URL from './images/test-set-2/098.jpeg';
import image49URL from './images/test-set-2/099.jpeg';
import image50URL from './images/test-set-2/100.jpeg';


const images = [image1URL, image2URL, image3URL, image4URL, image5URL, image6URL, image7URL, image8URL, image9URL, image10URL,
                image11URL, image12URL, image13URL, image14URL, image15URL, image16URL, image17URL, image18URL, imageURL19, image20URL,
                image21URL, image22URL, image23URL, image24URL, image25URL, image26URL, image27URL, image28URL, image29URL, image30URL,
                image31URL, image32URL, image33URL, image34URL, image35URL, image36URL, image37URL, image38URL, image39URL, image40URL,
                image41URL, image42URL, image43URL, image44URL, image45URL, image46URL, image47URL, image48URL, image49URL, image50URL];

// Testing Array Construction
console.log(images[0]);
console.log(images[1]);
console.log(images[2]);
console.log(images[3]);
console.log(images[4]);
console.log(images[5]);

var index = 0;

let modelPromise;
let baseModel = 'lite_mobilenet_v2';

window.onload = () => modelPromise = cocoSsd.load();

const button = document.getElementById('toggle');
button.onclick = () => {
  index = index+1;
  image.src = images[index];
};

const select = document.getElementById('base_model');
select.onchange = async (event) => {
  const model = await modelPromise;
  model.dispose();
  modelPromise = cocoSsd.load(
      {base: event.srcElement.options[event.srcElement.selectedIndex].value});
};

const image = document.getElementById('image');
image.src = images[index];
 
const runButton = document.getElementById('run');
runButton.onclick = async () => {
  const model = await modelPromise;
  console.log('model loaded');
  console.time('predict1');
  const result = await model.detect(image);
  console.timeEnd('predict1');
  for (let i = 0; i < result.length; i++) {
    console.log(result[i].class);
  }

  const c = document.getElementById('canvas');
  const context = c.getContext('2d');
  context.drawImage(image, 0, 0);
  context.font = '10px Arial';

  console.log('number of detections: ', result.length);
  for (let i = 0; i < result.length; i++) {
    context.beginPath();
    context.rect(...result[i].bbox);
    context.lineWidth = 1;
    context.strokeStyle = 'green';
    context.fillStyle = 'green';
    context.stroke();
    context.fillText(
        result[i].score.toFixed(3) + ' ' + result[i].class, result[i].bbox[0],
        result[i].bbox[1] > 10 ? result[i].bbox[1] - 5 : 10);
  }
};
