import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FaElementor, FaUsersCog, FaUserShield } from 'react-icons/fa';
import { IRootState } from 'src/redux/rootReducer';
// import { MODAL_TYPES } from 'src/appConfig/modal';
import {
  Button,
  Checkbox,
  DatePicker,
  DateRangePicker,
  Input,
  TimePicker,
  WeekPicker,
  View,
  Tag,
  InputPassword,
  IconClickable,
  Text,
  Icon,
  Image,
  Loading,
  InputFile,
  InputCurrency,
  ToolTip,
  ButtonSwitch,
} from 'src/components/common';
import ComfirmationCodeField from 'src/components/ComfirmationCodeField';
import RadioButton from 'src/components/common/RadioButton';
import './styles.scss';
import SortingButton from 'src/components/common/SortingButton';
import FileUpload from 'src/components/FileUpload';
import NewDropdown from 'src/components/common/CustomDropdown';
import Sidebar from 'src/components/Sidebar';
import LayoutWithSidebar from 'src/layout/LayoutWithSidebar';
import AccountBadge from 'src/components/Badge';
import Banner from 'src/components/Banner';
import Signature from 'src/components/Signature';
import CountTable from 'src/components/CountTable';
import {
  dataA,
  dataB,
  headerListSCHEDULE_A,
  headerListSCHEDULE_B,
} from 'src/appConfig/countTableHeader';
import { Toastify } from 'src/services';
import { DateRange } from 'src/components/common/DateRangePicker';
// import { hideModal, showModal } from 'src/redux/modal/modalSlice';
import TabsBar from 'src/components/TabsBar';
import DevPagev2 from './devPagev2';
import { Container } from '@material-ui/core';
import { Location } from 'history';
import { useHistory } from 'react-router-dom';
import { hideDialog, showDialog } from 'src/redux/dialog/dialogSlice';
import { DIALOG_TYPES } from 'src/redux/dialog/type';

const Dev: React.FC<Props> = ({ showModal, closeModal, collapseSidebar, location }) => {
  const [files, setFiles] = useState<File[]>();
  const [count, setCount] = useState(0);
  const [datePicked, setDatePicked] = useState<Date>(new Date());
  const [dateRange, setDateRange] = useState<[Date, Date]>([new Date(), new Date()]);
  const [newTime, setNewTime] = useState<Date>(new Date());
  const [week, setWeek] = useState<[Date, Date]>([new Date(), new Date()]);
  const [radio, setRadio] = useState<string>('');
  const [select, setSelect] = useState<string[]>([]);
  const [source, setSource] = useState<string>(null);
  const [value, setValue] = useState<number>(0);
  const [valueBoolean, setValueBoolean] = useState<boolean>(null);

  const [isGridView, setIsGridView] = useState(true);

  const handleOpenYesNoModal = () => {
    showModal({
      type: DIALOG_TYPES.YESNO_DIALOG,
      data: {
        title: 'Delete File',
        content: 'Are you sure that you want to delete Document 5_exported.raw?',
        onOk: closeModal,
        onCancel: closeModal,
        // iconVariant: 'warning',
      },
    });
  };

  const handleOpenConfirmModal = () => {
    showModal({
      type: DIALOG_TYPES.YESNO_DIALOG,
      data: {
        title: 'Delete File',
        content: 'Are you sure that you want to delete Document 5_exported.raw?',
        onOk: closeModal,
        onCancel: closeModal,
        // iconVariant: 'danger',
      },
    });
  };

  const handleOpenContentModal = () => {
    showModal({
      type: DIALOG_TYPES.CONTENT_DIALOG,
      data: {
        content: <View style={{ width: 450 }}>Text go here</View>,
      },
    });
  };

  const handleOpenOkModal = () => {
    showModal({
      type: DIALOG_TYPES.YESNO_DIALOG,
      data: {
        // iconVariant: 'primary',
        title: 'Welcome',
        content: 'You are welcome',
        onOk: closeModal,
      },
    });
  };

  const handleCodeFieldChange = (value: string) => {
    console.log('value', value);
  };

  const handleCheckboxChange = (name, value: any[]) => {
    console.log('handleCheckboxChange', value);
    setSelect(value);
  };

  const handleDatePickerChage = (value: Date) => {
    setDatePicked(value);
  };

  const handleDateRangePickerChage = (value: DateRange) => {
    console.log(`handleDateRangePickerChage`, value);
    setDateRange(value);
  };

  const handleTimePickerChage = (value: Date) => {
    console.log('handleTimePickerChage', value);
    setNewTime(value);
  };

  const handleWeekPickerChage = (value: any) => {
    console.log(value);
    setWeek(value);
  };

  // const tableHeader = [
  //   'CALENDAR YEAR OF ACQUISITION',
  //   'MACHINERY AND EQUIPMENT FOR INDUSTRY, PROFESSION, OR TRADE',
  //   'OFFICE FURNITURE AND EQUIPMENT',
  //   'OTHER EQUIPMENT',
  //   'TOOLS, MOLDS, DIES, JIGS',
  //   'PERSONAL COMPUTERS',
  //   'LOCAL AREA NETWORK (LAN) EQUIPMENT AND MAINFRAMES',
  // ];

  const renderBody = () => (
    <Container>
      <View className="mt-8" flexGrow={1}>
        <View className="mt-40" justify="space-around">
          <CountTable
            onChange={(value: any) => console.log(value)}
            currentYear={2021}
            headerList={headerListSCHEDULE_A}
            data={dataA}
            containerClassName="mb-40"
          />
          <CountTable
            onChange={(value: any) => console.log(value)}
            // currentYear={2021}
            headerList={headerListSCHEDULE_A}
            data={dataA}
            containerClassName="mb-40"
          />
          <CountTable
            onChange={(value: any) => console.log(value)}
            currentYear={2021}
            headerList={headerListSCHEDULE_B}
            data={dataB}
          />
          <CountTable
            onChange={(value: any) => console.log(value)}
            // currentYear={2021}
            headerList={headerListSCHEDULE_B}
            data={dataB}
          />
          <InputCurrency
            onChange={(name: string, value: number) => {
              setValue(value);
            }}
            label="Currency"
            value={value}
          />
          <InputFile label="ADD FILE" onChange={() => {}} />
          <Banner
            title="Tips"
            status="warning"
            className="mb-8"
            message="Et eu nostrud deserunt id anim mollit. Sint deserunt adipisicing aliqua ut tempor qui consectetur duis reprehenderit consectetur. Voluptate consectetur enim ut veniam enim dolor commodo ea ad ad aliqua nulla officia."
          />
          <Banner
            title="Tips"
            status="rejected"
            className="mb-8"
            message="Et eu nostrud deserunt id anim mollit. Sint deserunt adipisicing aliqua ut tempor qui consectetur duis reprehenderit consectetur. Voluptate consectetur enim ut veniam enim dolor commodo ea ad ad aliqua nulla officia."
          />
          <Banner
            title="Tips"
            status="completed"
            className="mb-8"
            message="Et eu nostrud deserunt id anim mollit. Sint deserunt adipisicing aliqua ut tempor qui consectetur duis reprehenderit consectetur. Voluptate consectetur enim ut veniam enim dolor commodo ea ad ad aliqua nulla officia."
          />

          <View className="mb-80">
            <h2 className="has-text-danger">Deposition Badge</h2>
            <AccountBadge variant="Active" className="mb-8" />
            <AccountBadge variant="Completed" className="mb-8" />
            <AccountBadge variant="Pending" className="mb-8" />
            <AccountBadge variant="Rejected" className="mb-8" />
            <Signature onChange={(name: string, value: any) => setSource(value)} />
            <Image src={source} />
          </View>
          <Image src="https://picsum.photos/200" />
          <NewDropdown
            yPosition="bottom"
            label={<Icon name="ic_more-vertical" className="is-flex" />}
            items={[
              {
                onClick: () => {},
                label: 'Use in Final Transcript',
                icon: 'ic_check',
                isActive: true,
              },
              { onClick: () => {}, label: 'click me', icon: 'ic_edit' },
            ]}
          />
          <NewDropdown
            label={<Button>Dropdown 4</Button>}
            items={[
              {
                onClick: () => {},
                label: 'Use in Final Transcript',
                icon: 'ic_check',
                isActive: true,
              },
              { onClick: () => {}, label: 'click me', icon: 'ic_edit' },
            ]}
          />
        </View>

        <View className="mt-40" isRow justify="space-around">
          <Tag>Primary</Tag>
          <Tag variant="is-success">Success</Tag>
          <Tag variant="is-danger">Danger</Tag>
          <Tag variant="is-dark">Dark</Tag>
          <Tag variant="is-info">Info</Tag>
          <Tag variant="is-light">Light</Tag>
          <Tag variant="is-black">Black</Tag>
          <Tag variant="is-warning">Warning</Tag>
        </View>

        <View className="mt-40" isRow justify="space-around">
          <Tag isLight>Primary</Tag>
          <Tag isLight variant="is-success">
            Success
          </Tag>
          <Tag isLight variant="is-danger">
            Danger
          </Tag>
          <Tag isLight variant="is-dark">
            Dark
          </Tag>
          <Tag isLight variant="is-info">
            Info
          </Tag>
          <Tag isLight variant="is-light">
            Light
          </Tag>
          <Tag isLight variant="is-black">
            Black
          </Tag>
          <Tag isLight variant="is-warning">
            Warning
          </Tag>
        </View>

        <View className="mt-40">
          {files?.map((file) => (
            <View>
              <Text>Name: {file.name}</Text>
              <Text>Size: {file.size} bytes</Text>
              <Text>Type: {file.type}</Text>
            </View>
          ))}

          <FileUpload onChange={(value: any) => setFiles(value)} />
        </View>

        <View className="mt-16" isRow>
          <IconClickable
            className={`cmp-swicht-list-view ${isGridView ? 'cmp-swicht-list-view__active' : ''}`}
            name="ic_grid"
            disabled={isGridView}
            onClick={() => setIsGridView(true)}
          />
          <IconClickable
            className={`cmp-swicht-list-view ${!isGridView ? 'cmp-swicht-list-view__active' : ''}`}
            name="ic_list"
            disabled={!isGridView}
            onClick={() => setIsGridView(false)}
          />
        </View>

        <View className="mt-40" isRow justify="space-around">
          <Tag>Primary</Tag>
          <Tag variant="is-success">Success</Tag>
          <Tag variant="is-danger">Danger</Tag>
          <Tag variant="is-dark">Dark</Tag>
          <Tag variant="is-info">Info</Tag>
          <Tag variant="is-light">Light</Tag>
          <Tag variant="is-black">Black</Tag>
          <Tag variant="is-warning">Warning</Tag>
        </View>
        <View className="mt-40" isRow justify="space-around">
          <Tag isLight>Primary</Tag>
          <Tag isLight variant="is-success">
            Success
          </Tag>
          <Tag isLight variant="is-danger">
            Danger
          </Tag>
          <Tag isLight variant="is-dark">
            Dark
          </Tag>
          <Tag isLight variant="is-info">
            Info
          </Tag>
          <Tag isLight variant="is-light">
            Light
          </Tag>
          <Tag isLight variant="is-black">
            Black
          </Tag>
          <Tag isLight variant="is-warning">
            Warning
          </Tag>
        </View>
        <View className="mt-40">
          <Input label="Text" defaultValue="1" />
        </View>
        <View className="mt-40">
          <div className="columns">
            <div className="column">
              <DateRangePicker
                selecteds={dateRange}
                label="date range 1"
                onChange={handleDateRangePickerChage}
              />
            </div>
            <div className="column">
              <DateRangePicker
                label="date range 1"
                onChange={handleDateRangePickerChage}
                errorMessage="error go here"
              />
            </div>
            <div className="column">
              <DateRangePicker
                selecteds={dateRange}
                label="date range 1"
                onChange={handleDateRangePickerChage}
                disabled
              />
            </div>
          </div>
        </View>

        <View className="mt-40">
          <div className="columns">
            <div className="column">
              <WeekPicker
                weekSelected={week}
                label="week picker 1"
                onChange={handleWeekPickerChage}
              />
            </div>
            <div className="column">
              <WeekPicker
                weekSelected={week}
                label="week picker 1"
                onChange={handleWeekPickerChage}
                errorMessage="error go here"
              />
            </div>
            <div className="column">
              <WeekPicker
                weekSelected={week}
                label="week picker 1"
                onChange={handleWeekPickerChage}
                disabled
              />
            </div>
          </div>
        </View>

        <View className="mt-40">
          <div className="columns">
            <div className="column">
              <DatePicker selected={datePicked} label="date 1" onChange={handleDatePickerChage} />
            </div>
            <div className="column">
              <DatePicker
                label="date 2"
                onChange={handleDatePickerChage}
                errorMessage="error go here"
              />
            </div>
            <div className="column">
              <DatePicker
                selected={datePicked}
                label="date 3"
                onChange={handleDatePickerChage}
                disabled
              />
            </div>
          </div>
        </View>

        <View className="mt-40">
          <div className="columns">
            <div className="column">
              <TimePicker selected={newTime} label="time 1" onChange={handleTimePickerChage} />
            </div>
            <div className="column">
              <DatePicker
                label="date 2"
                onChange={handleDatePickerChage}
                errorMessage="error go here"
              />
            </div>
            <div className="column">
              <DatePicker
                selected={datePicked}
                label="date 3"
                onChange={handleDatePickerChage}
                disabled
              />
            </div>
          </div>
        </View>

        <View className="mt-40" isRow justify="space-around">
          <h1>{count}</h1>
        </View>

        <View
          className="mt-40"
          isRow
          justify="space-around"
          style={{ backgroundColor: 'white', padding: 20 }}
        >
          <SortingButton />

          <Button onClick={() => setCount(count + 1)}>Hello</Button>
          <Button isOutline onClick={handleOpenConfirmModal}>
            Modal
          </Button>
          <Button isOutline onClick={handleOpenContentModal}>
            Content Modal
          </Button>
          <Button isOutline disabled>
            Disabled
          </Button>
          <Button disabled>Pri Disabled</Button>
        </View>

        <View className="mt-40" isRow justify="space-around">
          <Button icon={<FaElementor />}>To Interview</Button>
          <Button icon={<FaUserShield />} iconPosition="right">
            Icon Right
          </Button>
          <Button icon={<FaUsersCog />} variant="outline">
            Icon Left
          </Button>
          <Button
            icon={<ToolTip message={'Test Tool Tip'} />}
            iconPosition="right"
            variant="outline"
          >
            Icon Right
          </Button>
          <ToolTip message={'Test Tool Tip top'} />
          <ToolTip message={'Test Tool Tip bottom'} placement="bottom" />
          <ToolTip message={'Test Tool Tip right-start'} placement="right-start" hasArrow={false} />
        </View>

        <View className="mt-40" isRow justify="space-around">
          <Button onClick={handleOpenOkModal} variant="outline">
            OK Modal
          </Button>
          <Button onClick={handleOpenYesNoModal}>Yes No Modal</Button>
          <Button onClick={() => Toastify.info('Test Toast Info', { icon: <FaUserShield /> })}>
            Toast Info
          </Button>
          <Button onClick={() => Toastify.success('Test Toast Success')}>Toast Success</Button>
          <Button onClick={() => Toastify.error('Test Toast Error')}>Toast Error</Button>
        </View>

        <View className="mt-40" isRow justify="space-around">
          <ButtonSwitch value={valueBoolean} onChange={(_, value) => setValueBoolean(value)} />
          <ButtonSwitch
            value={valueBoolean}
            onChange={(_, value) => setValueBoolean(value)}
            disabled
          />
          <Button variant="text">Text Button</Button>
          <Button variant="link">Link Button</Button>
          <Button variant="outline">Outline Button</Button>
        </View>

        <View className="mt-40" isRow justify="space-around">
          <Loading loadingStyle={1} />
          <Loading loadingStyle={2} />
          <Loading loadingStyle={3} />
          <Loading loadingStyle={4} />
          <Loading loadingStyle={5} />
        </View>
        <View className="mt-40">
          <ComfirmationCodeField onChange={handleCodeFieldChange} />
        </View>

        <View className="mt-40">
          <Checkbox.Group
            label="Hello World Checkbox"
            options={[
              { label: 'Hello', value: 'Hello' },
              { label: 'World', value: 'World' },
              { label: 'Loc', value: 'World' },
              { label: 'Tran', value: 'World' },
            ]}
            onChange={handleCheckboxChange}
            value={select}
            columns={3}
          />
        </View>
        <View className="mt-40">
          <Checkbox.Group
            label="Hello World Checkbox"
            options={[
              { label: 'Hello', value: 'Hello' },
              { label: 'World', value: 'World' },
              { label: 'Loc', value: 'World' },
              { label: 'Tran', value: 'World' },
            ]}
            onChange={handleCheckboxChange}
            value={select}
            columns={3}
            disabled
          />
        </View>
        <View className="mt-40">
          {radio}
          <RadioButton
            label="Hello World Radio"
            options={[
              { label: 'Hello', value: 'Hello' },
              { label: 'World', value: 'World' },
              { label: 'Loc', value: 'World' },
              { label: 'Tran', value: 'World' },
            ]}
            onChange={(name, value: string) => setRadio(value)}
          />
        </View>
        <View className="mt-40">
          <Input label="Text" defaultValue="1" />
          <Input label="Text Error" defaultValue="2" errorMessage="aaaaa" />
          <Input label="Text Disabled" defaultValue="3" disabled />
          <Input label="Password" type="password" />
          <InputPassword label="Password with eye" />
        </View>
      </View>
    </Container>
  );

  const tabs = [
    { value: 'v1', label: 'V1' },
    { value: 'v2', label: 'V2' },
  ];

  const query = new URLSearchParams(location.search);
  const queryTab = query.get('tab');
  const history = useHistory();

  const [tab, setTab] = useState<string>(queryTab || 'v1');

  return (
    <View className="c-container" isRow justify="space-around">
      <LayoutWithSidebar
        sidebar={
          <View className="mt-80">
            <Sidebar />
          </View>
        }
        body={
          <View>
            <TabsBar
              tabsList={tabs}
              value={tab}
              onChange={(_, id: string) => {
                setTab(id);
                query.set('tab', id);
                history.push({ search: query.toString() });
              }}
            />
            {tab === 'v1' && renderBody()}
            {tab === 'v2' && <DevPagev2 />}
          </View>
        }
        footer={null}
      />
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & { location: Location<string> };

const mapStateToProps = (state: IRootState) => ({ collapseSidebar: state.common.collapseSidebar });

const mapDispatchToProps = {
  showModal: showDialog,
  closeModal: hideDialog,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dev);
