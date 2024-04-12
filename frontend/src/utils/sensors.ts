import { PointerSensor, useSensor, useSensors } from '@dnd-kit/core';

export default function sensors() {
  return useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 5,
      },
    }),
  );
}