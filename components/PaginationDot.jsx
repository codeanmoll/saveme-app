import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { View } from 'react-native';

const PaginationDot = ({ index, progress }) => {
  const style = useAnimatedStyle(() => {
    const active = Math.round(progress.value) === index;
    return {
      opacity: active ? 1 : 0.3,
      transform: [{ scale: active ? 1.2 : 1 }],
    };
  });

  return (
    <Animated.View
      style={[
        {
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: '#FFF',
          marginHorizontal: 6,
        },
        style,
      ]}
    />
  );
};

export default PaginationDot;
