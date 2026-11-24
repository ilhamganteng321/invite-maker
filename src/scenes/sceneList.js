import Scene1 from './Scene1';
import Scene2 from './Scene2';
import Scene3 from './Scene3';
import Scene4 from './Scene4';
import Scene5 from './Scene5';
import Scene6 from './Scene6';

export const scenes = [
  { id: 1, title: 'Pembuka', component: Scene1 },
  { id: 2, title: 'Sambutan Orang Tua', component: Scene2 },
  { id: 3, title: 'Akad Nikah', component: Scene3 },
  { id: 4, title: 'Resepsi', component: Scene4 },
  { id: 5, title: 'Doa & Doa-doa', component: Scene5 },
  { id: 6, title: 'Penutup', component: Scene6 },
];

export function getSceneComponent(id) {
  const scene = scenes.find((s) => s.id === id);
  return scene ? scene.component : null;
}