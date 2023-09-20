import * as React from 'react';
import { DrawerBody, DrawerHeader, DrawerHeaderTitle, DrawerInline, DrawerProps } from '@fluentui/react-drawer';
import { Button, makeStyles, mergeClasses, shorthands, tokens } from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  root: {
    ...shorthands.border('2px', 'solid', '#ccc'),
    ...shorthands.overflow('hidden'),

    display: 'flex',
    height: '480px',
    backgroundColor: '#fff',
  },

  flexColumn: {
    flexDirection: 'column',
  },

  content: {
    ...shorthands.flex(1),
    ...shorthands.padding('16px'),
    ...shorthands.overflow('auto'),

    position: 'relative',
  },

  buttons: {
    ...shorthands.flex(1),
    ...shorthands.padding('16px'),

    position: 'sticky',
    top: '-16px',
    right: '-16px',
    left: '-16px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    columnGap: tokens.spacingHorizontalXS,
    backgroundColor: '#fff',
    transitionDuration: tokens.durationFast,
  },
});

type DrawerInlineExampleProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  position: DrawerProps['position'];
};

const setButtonText = (open: boolean, position: DrawerProps['position']) => {
  switch (position) {
    case 'start':
      return `${open ? 'Close' : 'Open'} left`;

    case 'end':
      return `${open ? 'Close' : 'Open'} right`;

    case 'bottom':
      return `${open ? 'Close' : 'Open'} bottom`;

    default:
      return undefined;
  }
};

const DrawerInlineExample: React.FC<DrawerInlineExampleProps> = ({ open, setOpen, position }) => {
  return (
    <DrawerInline open={open} position={position}>
      <DrawerHeader>
        <DrawerHeaderTitle
          action={
            <Button appearance="subtle" aria-label="Close" icon={<Dismiss24Regular />} onClick={() => setOpen(false)} />
          }
        >
          {position} Inline Drawer
        </DrawerHeaderTitle>
      </DrawerHeader>

      <DrawerBody>
        <p>Drawer content</p>
      </DrawerBody>
    </DrawerInline>
  );
};

export const Inline = () => {
  const styles = useStyles();

  const [leftOpen, setLeftOpen] = React.useState(false);
  const [rightOpen, setRightOpen] = React.useState(false);
  const [bottomOpen, setBottomOpen] = React.useState(false);

  return (
    <div className={mergeClasses(styles.root, styles.flexColumn)}>
      <div className={styles.root}>
        <DrawerInlineExample open={leftOpen} setOpen={setLeftOpen} position="start" />

        <div className={styles.content}>
          <div className={styles.buttons}>
            <Button appearance="primary" onClick={() => setLeftOpen(!leftOpen)}>
              {setButtonText(leftOpen, 'start')}
            </Button>

            <Button appearance="primary" onClick={() => setRightOpen(!rightOpen)}>
              {setButtonText(rightOpen, 'end')}
            </Button>

            <Button appearance="primary" onClick={() => setBottomOpen(!bottomOpen)}>
              {setButtonText(bottomOpen, 'bottom')}
            </Button>
          </div>

          {Array.from({ length: 100 }, (_, i) => (
            <p key={i}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore voluptatem similique reiciendis, ipsa
              accusamus distinctio dolorum quisquam, tenetur minima animi autem nobis. Molestias totam natus, deleniti
              nam itaque placeat quisquam!
            </p>
          ))}
        </div>
        <DrawerInlineExample open={rightOpen} setOpen={setRightOpen} position="end" />
      </div>

      <DrawerInlineExample open={bottomOpen} setOpen={setBottomOpen} position="bottom" />
    </div>
  );
};

Inline.parameters = {
  docs: {
    description: {
      story: [
        'DrawerInline is often used for navigation that is not dismissible.',
        'As it is on the same level as the main surface, users can still interact with other UI elements.',
        'This could be useful for swapping between different items in the main surface.',
      ].join('\n'),
    },
  },
};
