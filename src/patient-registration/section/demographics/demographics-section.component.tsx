import React, { SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CapturePhotoProps } from '../../patient-registration.component';
import styles from './../section.scss';
import { useField } from 'formik';
import { ExtensionSlot } from '@openmrs/esm-framework';
import { getField } from '../section-helper';
import { PatientRegistrationContext } from '../../patient-registration-context';

interface DemographicsSectionProps {
  fields: Array<any>;
  setCapturePhotoProps: (value: SetStateAction<CapturePhotoProps>) => void;
  currentPatientPhoto?: string;
}

export const DemographicsSection: React.FC<DemographicsSectionProps> = ({
  fields,
  setCapturePhotoProps,
  currentPatientPhoto,
}) => {
  const { t } = useTranslation();
  const [field, meta] = useField('addNameInLocalLanguage');
  const { setFieldValue } = React.useContext(PatientRegistrationContext);

  const onCapturePhoto = (dataUri: string, selectedFile: File, photoDateTime: string) => {
    if (setCapturePhotoProps) {
      setCapturePhotoProps({
        base64EncodedImage: dataUri,
        imageFile: selectedFile,
        photoDateTime: photoDateTime,
      });
    }
  };

  useEffect(() => {
    if (!field.value && meta.touched) {
      setFieldValue('additionalGivenName', '');
      setFieldValue('additionalMiddleName', '');
      setFieldValue('additionalFamilyName', '');
    }
  }, [field.value, meta.touched]);

  return (
    <section className={styles.formSection} aria-label="Demographics Section">
      <ExtensionSlot
        extensionSlotName="capture-patient-photo"
        state={{ onCapturePhoto, initialState: currentPatientPhoto }}
      />
      {fields.map(field => (
        <div key={field}>{getField(field)}</div>
      ))}
    </section>
  );
};
