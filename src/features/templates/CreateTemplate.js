// src/pages/admin/templates/CreateTemplate.jsx
import React, { useState } from 'react';
import { Steps } from 'primereact/steps';
import 'primereact/resources/themes/lara-light-blue/theme.css';

import Step1BasicInfo from './steps/Step1BasicInfo';
import Step2UploadTemplate from './steps/Step2UploadTemplate';
import Step3FormFields from './steps/Step3FormFields';
import Step4MappingPreview from './steps/Step4MappingPreview';
import Step5Publish from './steps/Step5Publish';
import { useNavigate } from 'react-router-dom';

const CreateTemplate = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0); 
  const [templateData, setTemplateData] = useState({
    basicInfo: {},
    design: {},
    formFields: [],
    mapping: '',
  });

  const updateData = (section, data) => {
    setTemplateData((prev) => ({ ...prev, [section]: data }));
  };

  const items = [
    { label: 'Basic Info' },
    { label: 'Upload Template' },
    { label: 'Add Fields' },
    { label: 'Preview Mapping' },
    { label: 'Publish' },
  ];

  const next = () => setStep((prev) => Math.min(prev + 1, items.length - 1));
  
  const back = () => {
    if (step === 0) {
      navigate('/templates');
    } else {
      setStep((prev) => prev - 1);
    }
  };
  
  
  const stepComponents = [
    <Step1BasicInfo
      data={templateData.basicInfo}
      onNext={next}
      onBack={back}
      onChange={(data) => updateData('basicInfo', data)}
    />,
    <Step2UploadTemplate
      data={templateData.design}
      onNext={next}
      onBack={back}
      onChange={(data) => updateData('design', data)}
    />,
    <Step3FormFields
      data={templateData.formFields}
      onNext={next}
      onBack={back}
      onChange={(data) => updateData('formFields', data)}
    />,
    <Step4MappingPreview
      data={templateData}
      onNext={next}
      onBack={back}
      onChange={(mapping) => updateData('mapping', mapping)}
    />,
    <Step5Publish
      data={templateData}
      onBack={back}
    />
  ];

  return (
    <div className="container py-4">
      <Steps model={items} activeIndex={step} readOnly />
      <div className="card mt-4 p-3">
        {stepComponents[step]}
      </div>
    </div>
  );
};

export default CreateTemplate;
