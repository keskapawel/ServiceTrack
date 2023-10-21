import { ComponentProps, FormEvent, Fragment, memo, ReactNode, useCallback, useId } from 'react';
import { DialogProps, Grid, Stack } from '@mui/material';

import { palette } from 'styles/palette';

import { Button } from 'components/common/Button';
import { Icon } from 'components/common/Icon';
import { Typography } from 'components/common/Typography';
import { Loader } from 'components/common/Loader';
import { Tabs } from 'components/common/Tabs';

import { StyledDialog, StyledDialogActions, StyledDialogContent, StyledDialogTitle, StyledForm, StyledIconButton } from './styled';
import { DESCRIPTION_ID, LABEL_ID, PREFIX_ACTION_BUTTON_ID, PREFIX_ACTION_BUTTON_MODAL, PREFIX_ACTION_TEXT_BUTTON_ID } from './constants';
import { useConfirmationModal } from './utils';

type TActionConfirmation = Pick<Required<Props>, 'title' | 'icon' | 'children'> & {
  buttonChildren?: ReactNode;
};

type Props = Pick<DialogProps, 'open' | 'fullWidth' | 'maxWidth' | 'fullScreen'> & {
  onClose: () => void;
  icon?: string;
  title: string;
  children: ReactNode;
  actions?: (ComponentProps<typeof Button> & {
    confirmation?: TActionConfirmation;
  })[];
  textActions?: ComponentProps<typeof Button>[];
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  cancelButton?: boolean;
  buttonsAtEnd?: boolean;
  centerTitle?: boolean;
  isLoading?: boolean;
} & TTabsProps;

type TTabsProps = { tabs: ComponentProps<typeof Tabs>['tabs']; tabsChildren: ReactNode[] } | { tabs?: undefined; tabsChildren?: undefined };

const Component = ({
  onClose,
  icon,
  title,
  children,
  actions = [],
  textActions = [],
  onSubmit,
  cancelButton = false,
  buttonsAtEnd = false,
  centerTitle = true,
  isLoading,
  tabs,
  tabsChildren,
  ...props
}: Props) => {
  const id = useId();
  const hasActions = (actions && actions.length > 0) || cancelButton;
  const hasTextActions = textActions.length > 0;
  const hasContentPadding = !!(children && !hasActions);
  const columnsCount = (actions?.length ?? 0) + new Number(cancelButton).valueOf();
  const {
    open: openConfirmationModal,
    close: closeConfirmationModal,
    onConfirm: onConfirmConfirmationModal,
    state: confirmationModalsState,
  } = useConfirmationModal({ count: actions?.length });

  const renderDialogWithForm = useCallback(
    (dialogContent: React.ReactNode) => {
      if (!onSubmit) return dialogContent;
      return <StyledForm onSubmit={onSubmit}>{dialogContent}</StyledForm>;
    },
    [onSubmit],
  );

  return (
    <StyledDialog onClose={onClose} aria-labelledby={`${id}-${LABEL_ID}`} aria-describedby={`${id}-${DESCRIPTION_ID}`} scroll='paper' {...props}>
      <StyledDialogTitle id={`${id}-${LABEL_ID}`}>
        <Grid container direction='row' alignItems='center'>
          <Grid item container xs={icon ? 12 : 10} direction='column' alignItems={centerTitle ? 'center' : 'flex-start'} order={{ xs: icon ? 3 : 1 }}>
            <Typography variant='h1'>{title}</Typography>
          </Grid>
          {icon && (
            <Grid item container xs={12} direction='column' alignItems='center' mb='24px' order={{ xs: 2 }}>
              <Icon icon={icon} color={palette.outline} size={52} />
            </Grid>
          )}

          <Grid item container xs={icon ? 12 : 2} direction='column' alignItems='flex-end' order={{ xs: icon ? 1 : 3 }}>
            <StyledIconButton aria-label='close' onClick={onClose} hoverColor={palette.baseColorHover}>
              <Icon icon='XIcon' color={palette.lockedTextAndPlaceholder} />
            </StyledIconButton>
          </Grid>
        </Grid>
      </StyledDialogTitle>

      <StyledDialogContent $hasPadding={hasContentPadding} id={`${id}-${DESCRIPTION_ID}`}>
        {isLoading ? (
          <Loader />
        ) : (
          <Stack spacing={3} direction='column' bgcolor='inherit'>
            {children}
            {tabs && (
              <Tabs tabs={tabs} orientation='horizontal' sticky>
                {tabsChildren}
              </Tabs>
            )}
          </Stack>
        )}
      </StyledDialogContent>

      {(hasActions || hasTextActions) && (
        <StyledDialogActions aria-label='Dialog Actions'>
          {renderDialogWithForm(
            <Grid container justifyContent={'space-between'}>
              {hasTextActions && (
                <Grid item container spacing={1} justifyContent={'flex-start'} xs='auto'>
                  {textActions.map(({ loading, ...buttonProps }, index) => (
                    <Grid key={`${id}-${PREFIX_ACTION_TEXT_BUTTON_ID}-${index}`} xs={'auto'} item>
                      <Button {...buttonProps} loading={loading || isLoading} variant='text' />
                    </Grid>
                  ))}
                </Grid>
              )}

              {hasActions && (
                <Grid item container spacing={1} columns={columnsCount} justifyContent={'flex-end'} xs>
                  {cancelButton && (
                    <Grid key={`${id}-${PREFIX_ACTION_BUTTON_ID}-cancel`} xs={buttonsAtEnd ? 'auto' : 1} item>
                      <Button variant='outlined' onClick={onClose} fullWidth>
                        Cancel
                      </Button>
                    </Grid>
                  )}

                  {actions.map(({ loading, confirmation, onClick, type, children, ...buttonProps }, index) => (
                    <Fragment key={`${id}-${PREFIX_ACTION_BUTTON_ID}-${index}`}>
                      <Grid xs={buttonsAtEnd ? 'auto' : 1} item>
                        <Button
                          fullWidth
                          {...buttonProps}
                          type={confirmation ? 'button' : type}
                          onClick={confirmation ? openConfirmationModal(index) : onClick}
                          loading={loading || isLoading}
                        >
                          {children}
                        </Button>
                      </Grid>

                      {confirmation && (
                        <Modal
                          key={`${id}-${PREFIX_ACTION_BUTTON_MODAL}-${index}`}
                          {...confirmation}
                          onClose={closeConfirmationModal(index)}
                          open={confirmationModalsState[index]}
                          onSubmit={type === 'submit' && onSubmit ? onConfirmConfirmationModal(index, onSubmit) : undefined}
                          actions={[
                            {
                              type,
                              children: confirmation.buttonChildren ?? children,
                              onClick: onClick ? onConfirmConfirmationModal(index, onClick) : undefined,
                              loading: loading || isLoading,
                            },
                          ]}
                          cancelButton
                        />
                      )}
                    </Fragment>
                  ))}
                </Grid>
              )}
            </Grid>,
          )}
        </StyledDialogActions>
      )}
    </StyledDialog>
  );
};
Component.displayName = 'Modal';

export const Modal = memo(Component) as typeof Component;
