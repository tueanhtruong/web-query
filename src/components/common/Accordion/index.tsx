import React, { ReactNode, ReactSVGElement, useEffect, useState } from 'react';
import cn from 'classnames';
import './styles.scss';
import { View, Icon, Text } from 'src/components/common';
import { AnimatePresence, motion, MotionProps } from 'framer-motion';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';

const Accordion: React.FC<Props> = ({
  title,
  className,
  children,
  isExpanded = false,
  isTranslatable,
  subTitle,
  onToggle,
  ...props
}) => {
  const [expanded, setExpanded] = useState<boolean>(isExpanded);

  useEffect(() => {
    setExpanded(isExpanded);
  }, [isExpanded]);

  const handleToggle = () => {
    // if (disabledExpand) return;
    if (!!onToggle) {
      onToggle(!expanded);
    } else {
      setExpanded(!expanded);
    }
  };

  return (
    <View
      className={cn(
        'cmp-accordion-item',
        {
          'cmp-accordion-item--collapsed': expanded === false,
          'cmp-accordion-item--expanded': expanded === true,
        },
        className
      )}
    >
      <motion.header initial={false} onClick={handleToggle}>
        <View
          isRow
          justify="space-between"
          align="center"
          className={cn(
            'cmp-accordion-item__header',
            { 'cmp-accordion-item__header--expanded': expanded === true },
            { 'cmp-accordion-item__header--collapsed': expanded === false }
          )}
        >
          {typeof title === 'string' ? (
            <Text className="fw-bold" size={18} isTranslatable>
              {title}
            </Text>
          ) : (
            title
          )}
          <View isRow justify="flex-end" align="center">
            {subTitle && <View className="mr-16">{subTitle}</View>}
            <Icon className="cmp-accordion-item__header__icon">
              {expanded ? <AiOutlineUp /> : <AiOutlineDown />}
            </Icon>
          </View>
        </View>
      </motion.header>
      <AnimatePresence initial={false}>
        <motion.section
          key="content"
          initial={isExpanded ? 'open' : 'collapsed'}
          animate={expanded ? 'open' : 'collapsed'}
          variants={{
            open: { opacity: 1, height: 'auto' },
            collapsed: { opacity: 0, height: 0 },
          }}
          transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          {...props}
        >
          <View className="cmp-accordion-item__body">{children}</View>
        </motion.section>
      </AnimatePresence>
    </View>
  );
};

type Props = MotionProps & {
  title: string | ReactNode;
  children: ReactNode;
  subTitle?: string | ReactNode;
  className?: string;
  isExpanded?: boolean;
  isTranslatable?: boolean;
  customIcon?: ReactSVGElement;
  onToggle?: (value: boolean) => void;
};

export default Accordion;
