import { Trans } from 'react-i18next';
import { Text, View } from 'src/components/common';

export const RegisterNowTip = () => {
  return (
    <View>
      <Text isTranslatable className="mb-8">
        Please have the following ready:
      </Text>
      <ul style={{ listStyleType: 'initial', marginLeft: 32 }}>
        <li>
          <Text>
            <Trans key={'registerNowTip1'}>
              The <strong>registered name</strong> of your business.
            </Trans>
          </Text>
        </li>
        <li>
          <strong>
            <Text isTranslatable>Federal Employer Identification Number (FEIN).</Text>
          </strong>
        </li>
        <li>
          <Text>
            <Trans key={'registerNowTip2'}>
              An <strong>email address</strong> to receive notifications.
            </Trans>
          </Text>
        </li>
      </ul>
      <Text isTranslatable className="mt-16 mb-8">
        Be prepared to:
      </Text>
      <ul style={{ listStyleType: 'initial', marginLeft: 32 }}>
        <li>
          <Text>
            <Trans key={'registerNowTip3'}>
              <strong>Create an Online Business ID.</strong> This is a unique identifier for your
              business.
            </Trans>
          </Text>
        </li>
        <li>
          <strong>
            <Text isTranslatable>Create a password and answer security questions.</Text>
          </strong>
        </li>
        <li>
          <Text>
            <Trans key={'registerNowTip4'}>
              <strong>Complete the online profile setup.</strong> Incomplete profiles cannot be
              saved, and you cannot return to the same Online Business ID to continue registering.
              You must establish another ID.
            </Trans>
          </Text>
        </li>
      </ul>
    </View>
  );
};

export const CreateProfileTip = () => {
  return (
    <View>
      <Text isTranslatable className="mb-8">
        Please have the following ready:
      </Text>
      <ul style={{ listStyleType: 'initial', marginLeft: 32 }}>
        <li>
          <Text>
            <Trans key={'createProfileTip1'}>
              The <strong>registered name</strong> of your business.
            </Trans>
          </Text>
        </li>
        <li>
          <strong>
            <Text isTranslatable>Federal Employer Identification Number (FEIN).</Text>
          </strong>
        </li>
        <li>
          <Text>
            <Trans key={'createProfileTip2'}>
              An <strong>email address</strong> to receive notifications.
            </Trans>
          </Text>
        </li>
      </ul>
      <Text isTranslatable className="mt-16 mb-8">
        Be prepared to:
      </Text>
      <ul style={{ listStyleType: 'initial', marginLeft: 32 }}>
        <li>
          <Text>
            <Trans key={'createProfileTip3'}>
              <strong>Create an Online Business ID.</strong> This is a <em>unique identifier</em>{' '}
              for your business.
            </Trans>
          </Text>
        </li>
        <li>
          <strong>
            <Text isTranslatable>Create a password and answer security questions.</Text>
          </strong>
        </li>
        <li>
          <Text>
            <Trans key={'createProfileTip4'}>
              <strong>Complete the online profile setup.</strong> Incomplete profiles cannot be
              saved, and you cannot return to the same Online Business ID to continue registering.
              You must establish another ID.
            </Trans>
          </Text>
        </li>
      </ul>
    </View>
  );
};
