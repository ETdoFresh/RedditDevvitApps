import { Devvit } from '@devvit/public-api';
import { Op, keyValueLabel } from '../types.js';
import type { Calc } from '../calculator.js';

type CurrentOpProps = {
  op: Op;
  active: boolean;
};

const CurrentOp: Devvit.BlockComponent<CurrentOpProps> = ({ op, active }) => {
  const activeColor = 'white';
  const inactiveColor = '#FFF5';
  return (
    <text color={active ? activeColor : inactiveColor} selectable={false}>
      {keyValueLabel(op)}
    </text>
  );
};

type OutputProps = {
  calc?: Calc | undefined;
};

const clampOutput = (num: number | undefined): string => {
  if (num !== undefined) {
    if (Number.isSafeInteger(num)) {
      return Number(num).toString();
    }
    let out = num.toPrecision();
    if (out.length >= 23) {
      out = num.toPrecision(14);
    } else if (out.length > 20) {
      out = num.toPrecision(15);
    }
    return out;
  }
  return 'Loading...';
};

export const Output: Devvit.BlockComponent<OutputProps> = ({ calc }) => {
  const opStatus = [Op.ADD, Op.SUBTRACT, Op.MULTIPLY, Op.DIVIDE].map((op) => (
    <CurrentOp op={op} active={op === calc?.op} />
  ));

  const bufferText = calc?.op !== undefined ? (calc?.operandA ?? '') : '';

  return (
    <vstack
      border="thin"
      backgroundColor="black"
      padding="small"
      cornerRadius="small"
      gap="small"
      height="96px"
    >
      <hstack gap="medium" alignment="middle center">
        {opStatus}
      </hstack>
      <hstack alignment="middle right">
        <text color="#FFF5" selectable={false}>
          {bufferText}
        </text>
      </hstack>
      <hstack alignment="middle right">
        <text size="xlarge" weight="bold" selectable={false}>
          {clampOutput(calc?.entry)}
        </text>
      </hstack>
    </vstack>
  );
};
